import React from 'react'
import Reflux from 'reflux'

import { Link, browserHistory } from 'react-router'
import _ from 'lodash'

import BodegaSillaActions from '../actions/BodegaSillaActions'
import Env from '../Config'
import io from 'socket.io-client'

import Item from '../components/bodega-silla/Item.jsx'

import ItemHijo from '../components/bodega-silla/ItemHijo.jsx'

const socket = io.connect( `${Env.url}bodega-silla` )

let BodegaSillaStore = Reflux.createStore({
  
  listenables: [BodegaSillaActions],

  obj: { 
    renderItem: [],
    buscar: null
  },

  init: function() {

  },

  getContent: function() {

  },

  getInitialState: function() {

    //return this.obj
  },

  renderBodegaSilla: function() {
    this.getBodegaSilla()
  },

  hijo: function( ev ) {
  	console.log( ev.target.dataset.codigo )

    socket.emit('buscarHijoSilla', ev.target.dataset.codigo,  ( productos ) => {
		this.obj.renderItem = []
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<ItemHijo 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto}  />)
      })
      this.trigger(this.obj)
    })



  },

  buscar: function( event ) {
  	event.preventDefault()

    socket.emit('buscarBodegaSilla', event.target.elements[0].value, event.target.elements[1].value, event.target.elements[2].value, ( productos ) => {
		this.obj.renderItem = []
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<Item 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto}
              								hijo={this.hijo}  />)
      })
      this.trigger(this.obj) 
    })

  },

  getBodegaSilla: function() {
    socket.emit('getBodegaSilla', ( productos ) => {
    	this.obj.buscar = this.buscar
      _.map( productos, (producto) => {
              this.obj.renderItem.push(<Item 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto}
              								hijo={this.hijo}  />)
      })
      this.trigger(this.obj) 
    })
  },



























  renderBodegaHijos: function (idProducto) {
    this.cleanState()
    this.getBodegaHijos(idProducto)
  },
  renderViewMore: function(idProducto){
    this.obj.filtro.limitA += 5
    this.getBodegaHijos(idProducto)
  },
  cleanState: function(){
    this.obj.renderItem = []
    this.obj.renderBodega = ''
    this.obj.filtro.limitA = 0
    this.obj.filtro.codigo = null
    this.obj.filtro.descripcion = null 
    this.obj.filtro.quiebre = false
    this.obj.filtro.desactivado = false 
    this.obj.filtro.bodega = false 
  },


  getBodegaHijos: function(idProducto){
    this.obj.filtrarColores = this.filtrarColores
    this.obj.filtro.codigo = idProducto
    socket.emit('getBodegaSilla',idProducto, this.obj.filtro, ( productos, cuenta ) => {

      this.obj.total = cuenta[0].total
      _.map( productos, (producto) => {
        _.map( producto, (p) => {
              this.obj.renderItem.push(<Item key={p.CODIGO_PRODUCTO} bodega={p}  />)
        })
      })  
      this.trigger(this.obj) 
    })
  },
  renderButton: function(rows,sub){
    if(document.getElementById("view-more")){
      if(rows > sub){
        document.getElementById("view-more").classList.remove("hidden")
      }else{
        document.getElementById("view-more").classList.add("hidden")
      }
    }
  }

})

export default BodegaSillaStore