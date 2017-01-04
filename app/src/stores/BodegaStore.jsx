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
    renderBodega: ''
  },
  getInitialState: function() {
    return this.obj
  },
  renderBodega: function(data){
  	socket.emit('allBodega', data)
  	socket.on('okAllBodega', (okAllBodega) =>{
  		this.obj.renderBodega = okAllBodega.productos
    	this.renderTransito(this.obj.renderBodega)
  	})
  },
  renderTransito: function(productos){
  	socket.emit('allTransito', productos)
  	socket.on('okAllTransito', (okAllTransito) =>{
  		this.obj.renderBodega = okAllTransito.productos
    	this.renderVale(this.obj.renderBodega)
  	})
  },
  renderVale: function(productos){
  	socket.emit('allVale', productos)
  	socket.on('okAllVale', (okAllVale) =>{
  		this.obj.renderBodega = okAllVale.productos
    	this.trigger(this.obj)
  	})
  }
  
})

export default BodegaStore