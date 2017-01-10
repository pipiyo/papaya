import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import BodegaActions from '../actions/BodegaActions'
import Env from '../Config'
import io from 'socket.io-client'

import Item from '../components/bodega/Item.jsx'

const socket = io.connect( `${Env.url}bodega` )

let BodegaStore = Reflux.createStore({
  listenables: [BodegaActions],
  obj: { 
    renderBodega: '',
    renderItem: [],
    filtro:{limitA:0, limitB:5}
  },

  renderBodega: function(data){
  	socket.emit('allBodega', data, this.obj.filtro, (n) => {
      this.obj.renderBodega = n.productos
      this.renderTransito(n.productos)
    })
  },
  renderTransito: function(productos){
  	socket.emit('allTransito', productos, (n) => {
      this.obj.renderBodega = n.productos
      this.renderVale(n.productos)
    })
  },
  renderVale: function(productos){
  	socket.emit('allVale', productos, (n) => {
      this.obj.renderBodega = n.productos
      this.renderItem()
      this.trigger(this.obj)
    })
  },
  renderViewMore: function(){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 5
    this.renderBodega()
  },
  renderItem: function(){
    let i
    for(i=0;this.obj.renderBodega.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.renderBodega[i].CODIGO_PRODUCTO} bodega={this.obj.renderBodega[i]} />)
    } 
  }
  
})

export default BodegaStore