import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-cliente/Item.jsx'

import ListadoClienteActions from '../actions/ListadoClienteActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoCliente` )

let ListadoClienteStore = Reflux.createStore({
  listenables: [ListadoClienteActions],
  obj: { 
    cliente : "",
    ejecutivo: "",
    cuenta: 0,
    proveedor: "",
    button: "",
    renderItem: [],
    filtro:{cliente: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.cliente = null 
  },
  renderCliente: function(){
    socket.emit('allCliente',this.obj.filtro, (n) => {
      this.obj.cliente = n.cliente
      this.obj.cuenta = n.cuenta
      this.obj.proveedor = n.proveedor
      this.renderItem()
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        if(document.getElementById('btn-buscar')){document.getElementById('btn-buscar').disabled = false}
      }, 1000)


      let cliente = document.getElementById("cliente").value

      if(cliente != ""){this.obj.filtro.cliente=cliente}else{this.obj.filtro.cliente = null}

      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allCliente',this.obj.filtro, (n) => {
        this.obj.cliente = n.cliente
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderCliente()
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
    for(i=0;this.obj.cliente.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.cliente[i].CODIGO_CLIENTE} datos={this.obj.cliente[i]} />)
    } 
  }
})

export default ListadoClienteStore