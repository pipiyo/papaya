import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import BodegaActions from '../actions/BodegaActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}bodega` )

let BodegaStore = Reflux.createStore({
  listenables: [BodegaActions],
  obj: { 
    renderBodega: '',
    filtro:{limitA:1, limitB:20}
  },

  renderBodega: function(data){
    this.obj.renderBodega = ""
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
      this.trigger(this.obj)
    })
  },
  renderViewMore: function(){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 20
    this.obj.filtro.limitB = this.obj.filtro.limitB + 20
    this.renderBodega()
  }
  
})

export default BodegaStore