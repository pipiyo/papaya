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
    categoria: '',
    total: 0,
    filtro:{limitA:0, limitB:5, codigo:null, descripcion:null, categoria: null, quiebre: false, desactivado: false}
  },
  renderReset: function(){
    this.obj.filtro.limitA = 0
    this.obj.renderItem = []
    this.obj.renderBodega = ''
    this.obj.filtro.codigo = null
    this.obj.filtro.descripcion = null 
    this.obj.filtro.categoria = null
    this.obj.filtro.quiebre = false
    this.obj.filtro.desactivado = false  
  },
  renderBodega: function(area){
  	socket.emit('allBodega',area, this.obj.filtro, (n) => {
      this.obj.renderBodega = n.productos
      this.obj.total = n.cuenta
      this.obj.categoria = n.categoria
      this.renderTransito(n.productos)
    })
  },
  renderFiltro : function(area){
      let codigo = document.getElementById('codigo').value
      let descripcion = document.getElementById('descripcion').value
      let categoria = document.getElementById('categoria').value
      let quiebre = document.getElementById('check-quiebre').checked
      let desactivado = document.getElementById('check-desactivado').checked


      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(descripcion != ""){this.obj.filtro.descripcion=descripcion}else{this.obj.filtro.descripcion= null}   
      if(categoria != ""){this.obj.filtro.categoria =  categoria }else{this.obj.filtro.categoria = null}
      if(quiebre){this.obj.filtro.quiebre =  true }else{this.obj.filtro.quiebre = false}
      if(desactivado){this.obj.filtro.desactivado =  true }else{this.obj.filtro.desactivado = false}

      this.obj.renderItem = []
      this.obj.filtro.limitA = 0
      this.obj.renderBodega = ''

      socket.emit('allBodega',area, this.obj.filtro, (n) => {
        this.obj.renderBodega = n.productos
        this.obj.total = n.cuenta
        this.obj.categoria = n.categoria
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
  renderViewMore: function(area){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 5
    this.renderBodega(area)
  },
  renderItem: function(){
    let i
    this.obj.renderItem = []
    for(i=0;this.obj.renderBodega.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.renderBodega[i].CODIGO_PRODUCTO} bodega={this.obj.renderBodega[i]} />)
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

export default BodegaStore