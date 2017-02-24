import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-oc/Item.jsx'

import ListadoOcActions from '../actions/ListadoOcActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoOc` )

let ListadoOcStore = Reflux.createStore({
  listenables: [ListadoOcActions],
  obj: { 
    oc : "",
    ejecutivo: "",
    cuenta: 0,
    proveedor: "",
    button: "",
    renderItem: [],
    filtro:{fechaInicio:undefined,fechaEntrega: undefined, codigo: null, estado: "Pendiente", proveedor: null, rocha: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "Pendiente" 
    this.obj.filtro.rocha = null
    this.obj.filtro.proveedor = null 
  },
  renderOc: function(){
    socket.emit('allOc',this.obj.filtro, (n) => {
      this.obj.oc = n.oc
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
      }, 3000)
      
      let fechaI = document.getElementById("fechaInicio").value
      let fechaE = document.getElementById("fechaEntrega").value
      let codigo = document.getElementById("codigo").value
      let estado = document.getElementById("estado").value
      let rocha = document.getElementById("rocha").value
      let proveedor = document.getElementById("proveedor").value

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(proveedor != ""){this.obj.filtro.proveedor=proveedor}else{this.obj.filtro.proveedor= null}   
      if(rocha != ""){this.obj.filtro.rocha = rocha}else{this.obj.filtro.rocha = null}
      
      this.obj.filtro.estado = estado
      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allOc',this.obj.filtro, (n) => {
        this.obj.oc = n.oc
        this.obj.cuenta = n.cuenta
        this.obj.proveedor = n.proveedor
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderFiltroFi : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaInicio = date
    }else{
      document.getElementById("fechaInicio").value = ""
      this.obj.filtro.fechaInicio = undefined
    }
    this.trigger(this.obj)
  },
  renderFiltroFe : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaEntrega = date
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.obj.filtro.fechaEntrega = undefined
    }
    this.trigger(this.obj)
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderOc()
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
    for(i=0;this.obj.oc.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.oc[i].CODIGO_OC} datos={this.obj.oc[i]} />)
    } 
  }
})

export default ListadoOcStore