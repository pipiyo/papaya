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
    tipoBodega: '',
    filtro:{limitA:0, limitB:5, codigo:null, descripcion:null, categoria: null, quiebre: false, desactivado: false, bodega: false}
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
    this.obj.filtro.bodega = false 
  },
  renderBodega: function(area, bodega){
    this.obj.tipoBodega = bodega

  	socket.emit('allBodega',area, this.obj.filtro, (n) => {
      this.obj.renderBodega = n.productos
      this.obj.total = n.cuenta
      this.obj.categoria = n.categoria
      this.renderTransito(n.productos)
    })
  },
  renderFiltro : function(area , bodega){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        document.getElementById('btn-buscar').disabled = false
      }, 3000)

      this.obj.tipoBodega = bodega

      let codigo = document.getElementById('codigo').value
      let descripcion = document.getElementById('descripcion').value
      let categoria = document.getElementById('categoria').value
      let quiebre = document.getElementById('check-quiebre').checked
      let desactivado = document.getElementById('check-desactivado').checked

      /* Filtro para la divición de bodega */

      let checkBodega = document.getElementById('check-bodega').checked
      let selectBodega

      if(checkBodega){selectBodega = 'allBodegaNew'}else{selectBodega='allBodega'}

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(descripcion != ""){this.obj.filtro.descripcion=descripcion}else{this.obj.filtro.descripcion= null}   
      if(categoria != ""){this.obj.filtro.categoria =  categoria }else{this.obj.filtro.categoria = null}
      if(quiebre){this.obj.filtro.quiebre =  true }else{this.obj.filtro.quiebre = false}
      if(desactivado){this.obj.filtro.desactivado =  true }else{this.obj.filtro.desactivado = false}
      if(checkBodega){this.obj.filtro.bodega =  true }else{this.obj.filtro.bodega = false}

      this.obj.renderItem = []
      this.obj.filtro.limitA = 0
      
      socket.emit(selectBodega,area, this.obj.filtro, (n) => {
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
  renderViewMore: function(area, bodega){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 5
    this.renderBodega(area, bodega)
  },
  renderItem: function(){
    let i
    for(i=0;this.obj.renderBodega.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.renderBodega[i].CODIGO_PRODUCTO} tipoBodega={this.obj.tipoBodega} bodega={this.obj.renderBodega[i]}  />)
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