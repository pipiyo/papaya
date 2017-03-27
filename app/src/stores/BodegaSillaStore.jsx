import React from 'react'
import Reflux from 'reflux'

import { Link, browserHistory } from 'react-router'
import _ from 'lodash'

import BodegaSillaActions from '../actions/BodegaSillaActions'
import Env from '../Config'
import io from 'socket.io-client'

import Filtro from '../components/bodega-silla/Filtro.jsx'

import FiltroHijo from '../components/bodega-silla/FiltroHijo.jsx'

import Item from '../components/bodega-silla/Item.jsx'

import ItemHijo from '../components/bodega-silla/ItemHijo.jsx'

const socket = io.connect( `${Env.url}bodega-silla` )

let BodegaSillaStore = Reflux.createStore({
  
  listenables: [BodegaSillaActions],

  obj: { 
    bodega : "padre",
    renderItem: [],
    filtro: null,
    buscar: null,
    buscado: null,
    volver:null,
    total: 0,
    search:{limitA:0, limitB:50,"cod":"", des:"", cat:"", pro: "", pais: "", proveedor: "", mecanismo: "",respaldo: ""} 
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


  volver: function(  ) {

    this.getBodegaSilla()

  },

  filtroHijoSilla: function( event ) {
    event.preventDefault()

document.getElementById('botonVolverSilla').classList.remove('hidden')

  this.obj.volver = this.volver

    this.obj.filtro = <FiltroHijo buscar={this.filtroHijoSilla} />

    socket.emit('filtroHijoSilla', this.obj.buscado, event.target.elements[0].value, event.target.elements[1].value, ( productos ) => {
    this.obj.renderItem = []
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<ItemHijo 
                              key={producto.CODIGO_PRODUCTO}  
                              bodega={producto} />)
      })
      this.trigger(this.obj) 
    })

  },

  buscarHijoSilla: function( ev ) {
    window.scrollTo(0, 0);
    this.obj.bodega = "hijo"
    this.obj.buscado = ev.target.dataset.codigo
    this.obj.buscadodes = ev.target.dataset.descripcion
    this.obj.buscar = this.filtroHijoSilla

    this.obj.volver = this.volver


    this.obj.filtro = <FiltroHijo buscar={this.filtroHijoSilla} />

    document.getElementById('botonVolverSilla').classList.remove('hidden')

    socket.emit('buscarHijoSilla', ev.target.dataset.codigo,  ( productos ) => {
		this.obj.renderItem = []
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<ItemHijo 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto} />)
      })
      this.trigger(this.obj)
    })

  },

  buscar: function( event ) {
  	event.preventDefault()
    this.obj.buscado = null

    if (document.getElementById('botonVolverSilla')) {
      document.getElementById('botonVolverSilla').classList.add('hidden')
    }

    this.obj.filtro = <Filtro buscar={this.buscar} />

    this.obj.search.cod = event.target.elements[0].value
    this.obj.search.des = event.target.elements[1].value
    this.obj.search.cat = event.target.elements[2].value
    this.obj.search.pro = event.target.elements[3].value
    this.obj.search.pais = event.target.elements[4].value
    this.obj.search.proveedor = event.target.elements[5].value
    this.obj.search.mecanismo = event.target.elements[6].value
    this.obj.search.respaldo = event.target.elements[7].value

    socket.emit('buscarBodegaSilla', 
                                  event.target.elements[0].value /*cod*/, 
                                  event.target.elements[1].value /*des*/, 
                                  event.target.elements[2].value /*cat*/,
                                  event.target.elements[3].value /*pro*/,
                                  event.target.elements[4].value /*pais*/,
                                  event.target.elements[5].value /*proveedor*/,
                                  event.target.elements[6].value /*mecanismo*/,
                                  event.target.elements[7].value /*respaldo*/, 
                                  this.obj.search.limitA,
                                  this.obj.search.limitB,( productos ) => {
		this.obj.renderItem = []
    this.obj.total = productos.cuenta
      _.map( productos.productos, ( producto ) => {
              this.obj.renderItem.push(<Item 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto}
              								buscarHijoSilla={this.buscarHijoSilla}  />)
      })
      this.trigger(this.obj) 
    })

  },
  getBodegaSilla: function() {
    this.obj.search.cod = ""
    this.obj.search.des = ""
    this.obj.search.cat = ""
    this.obj.search.pro = ""
    this.obj.search.pais = ""
    this.obj.search.proveedor = ""
    this.obj.search.mecanismo = ""
    this.obj.search.respaldo = ""

    this.obj.bodega = "padre"

    socket.emit('getBodegaSilla', ( productos ) => {
      this.obj.buscado = null
      this.obj.buscar = this.buscar

    this.obj.filtro = <Filtro buscar={this.buscar} />


      if (document.getElementById('botonVolverSilla')) {
        document.getElementById('botonVolverSilla').classList.add('hidden')
      }

      this.obj.renderItem = []
      this.obj.total = productos.cuenta
      _.map( productos.productos, (producto) => {

              this.obj.renderItem.push(<Item 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto}
              								buscarHijoSilla={this.buscarHijoSilla}  />)
      })
      this.trigger(this.obj) 
    })
  },
  renderViewMore: function(){
  if(this.obj.bodega == "padre"){
    this.obj.search.limitA += 50
      socket.emit('buscarBodegaSilla', 
                                    this.obj.search.cod,
                                    this.obj.search.des, 
                                    this.obj.search.cat,
                                    this.obj.search.pro,
                                    this.obj.search.pais,
                                    this.obj.search.proveedor, 
                                    this.obj.search.mecanismo,
                                    this.obj.search.respaldo,
                                    this.obj.search.limitA, 
                                    this.obj.search.limitB, ( productos ) => {
        this.obj.total = productos.cuenta
        _.map( productos.productos, ( producto ) => {
                this.obj.renderItem.push(<Item 
                                key={producto.CODIGO_PRODUCTO}  
                                bodega={producto}
                                buscarHijoSilla={this.buscarHijoSilla}  />)
        })
        this.trigger(this.obj) 
      })
    }
  },
  renderButton: function(rows,sub){
    if(document.getElementById("view-more")){
      if(rows > sub){
        document.getElementById("view-more").classList.remove("hidden")
      }else{
        document.getElementById("view-more").classList.add("hidden")
      }
    }
  },


























  renderBodegaHijos: function (idProducto) {
    this.cleanState()
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
  

})

export default BodegaSillaStore