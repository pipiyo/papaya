import React from 'react'
import Reflux from 'reflux'

import { Link, browserHistory } from 'react-router'
import _ from 'lodash'

import BodegaSonActions from '../actions/BodegaSonActions'
import Env from '../Config'
import io from 'socket.io-client'

import Item from '../components/bodega/Item.jsx'

const socket = io.connect( `${Env.url}bodega-hijos` )

let BodegaSonStore = Reflux.createStore({
  listenables: [BodegaSonActions],
  obj: { 
    renderBodega: '',
    renderItem: [],
    total: 0,
    filtro:{limitA:0, limitB:5, codigo:null, descripcion:null, categoria: null, quiebre: false, desactivado: false, bodega: false}
  },

  init: function() {

  },

  getContent: function() {

  },

  getInitialState: function() {

    //return this.obj
  },


  renderBodegaHijos: function(){

  },


  renderReset: function(id){


    this.obj.filtro.limitA = 0
    this.obj.renderItem = []
    this.obj.renderBodega = ''
    this.obj.filtro.codigo = null
    this.obj.filtro.descripcion = null 
    this.obj.filtro.quiebre = false
    this.obj.filtro.desactivado = false 
    this.obj.filtro.bodega = false 



    socket.emit('getBodegaHijos',id, this.obj.filtro, ( productos, cuenta ) => {
      this.obj.total = cuenta[0].total
      _.map( productos, (producto) => {
        _.map( producto, (p) => {
              this.obj.renderItem.push(<Item key={p.CODIGO_PRODUCTO} bodega={p}  />)
        })
      })  
      this.trigger(this.obj) 
    })

  },
  renderBodega: function(id){

  	socket.emit('allBodegaNewSon',id, this.obj.filtro, (n) => {
      this.obj.renderBodega = n.productos
      this.obj.total = n.cuenta
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
    })
  },
  renderViewMore: function(id){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 5
    this.renderBodega(id)
  },
  renderItem: function(){
    let i, link
    

    for(i=0;this.obj.renderBodega.length > i ;i++){

      let link = []
     
      // link.push(
      //   <div key={`a${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><Link class="icon-informe" to={`/home/producto/${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><i class="fa fa-eye" aria-hidden="true"></i></Link></div>
      // )

      this.obj.renderItem.push(<Item key={this.obj.renderBodega[i].CODIGO_PRODUCTO} link={link} bodega={this.obj.renderBodega[i]}  />)
    }
    this.trigger(this.obj) 
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

export default BodegaSonStore