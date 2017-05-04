import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-proveedor/Item.jsx'

import ListadoProveedorActions from '../actions/ListadoProveedorActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoProveedor` )

let ListadoProveedorStore = Reflux.createStore({
  listenables: [ListadoProveedorActions],
  obj: { 
    ejecutivo: "",
    cuenta: 0,
    button: "",
    renderItem: [],
    filtro:{proveedor: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.proveedor = null 
  },
  renderProveedor: function(){
    socket.emit('allProveedor',this.obj.filtro, (n) => {
      this.obj.proveedor = n.proveedor
      this.obj.cuenta = n.cuenta
      this.renderItem()
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        if(document.getElementById('btn-buscar')){document.getElementById('btn-buscar').disabled = false}
      }, 1000)


      let proveedor = document.getElementById("proveedor").value

      if(proveedor != ""){this.obj.filtro.proveedor=proveedor}else{this.obj.filtro.proveedor = null}

      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allProveedor',this.obj.filtro, (n) => {
        this.obj.proveedor = n.proveedor
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderProveedor()
  },
  renderButton: function(rows,sub){
    if(document.getElementById("btn-view")){
      if(rows > sub){
        document.getElementById("btn-view").classList.remove("hidden")
      }else{
        document.getElementById("btn-view").classList.add("hidden")
      }
    }
  },
  renderItem: function(){
    let i
    for(i=0;this.obj.proveedor.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.proveedor[i].CODIGO_PROVEEDOR} datos={this.obj.proveedor[i]} />)
    } 
  }
})

export default ListadoProveedorStore