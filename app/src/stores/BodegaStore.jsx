import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
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
  renderBodega: function(area){
    this.obj.tipoBodega = area

  	socket.emit('allBodega',area, this.obj.filtro, (n) => {
      this.obj.renderBodega = n.productos
      this.obj.total = n.cuenta
      this.obj.categoria = n.categoria
      this.renderTransito(n.productos)
    })
  },
  renderFiltro : function(area){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        if(document.getElementById('btn-buscar')){document.getElementById('btn-buscar').disabled = false}
      }, 3000)

      this.obj.tipoBodega = area

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
  renderViewMore: function(area){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 5
    this.renderBodega(area)
  },
  renderItem: function(){
    let i, link
    

    for(i=0;this.obj.renderBodega.length > i ;i++){

      /* Filtro Enlaces Bodega */

      link = []
      if(this.obj.filtro.bodega){
        link.push(
          <div key={`a${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><Link class="icon-informe" to={`/home/bodega-seleccion/${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><i class="fa fa-eye" aria-hidden="true"></i></Link></div>
          )
      }else{
        link.push(
          <div key={`a${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><Link class="icon-informe" to={`/home/actualizar-producto/${this.obj.tipoBodega}/${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link></div>,
          <div key={`b${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><Link class="icon-informe" to={`/home/stock-producto/${this.obj.tipoBodega}/${this.obj.renderBodega[i].CODIGO_PRODUCTO}`}><i class="fa fa-plus" aria-hidden="true"></i></Link></div>
          )
      }

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

export default BodegaStore