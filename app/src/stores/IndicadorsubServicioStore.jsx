import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import IndicadorSubServicioActions from '../actions/IndicadorSubServicioActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let IndicadorSubServicioStore = Reflux.createStore({
  listenables: [IndicadorSubServicioActions],
  obj: { 
    subServicio : "",
    ejecutivo: "",
    total: 0,
    area: "",
    button: "",
    filtro:{fechaInicio:undefined,fechaEntrega: undefined, codigo: null, estado: "EN PROCESO", vendedor: null, categoria: null, cliente: null, limit: 100}
  },
  init: function() {
   
  },
  getInitialState: function() {
    return this.obj
  },
  renderReset: function(){
    document.getElementById("cliente").value = ""
    document.getElementById("fechaInicio").value = ""
    document.getElementById("fechaEntrega").value = ""
    document.getElementById("codigo").value = ""
    document.getElementById("estado").options[0].selected = "selected"
    document.getElementById("vendedor").options[0].selected = "selected"
    document.getElementById("categoria").options[0].selected = "selected"
    this.obj.filtro.limit = 100
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = null
    this.obj.filtro.categoria = null
    this.obj.filtro.cliente = null 
  },
  renderSubServicio: function(area){
    this.obj.area = area
    socket.emit('allProyectoSubServicio',this.obj.filtro,this.obj.area)
    socket.on('okAllProyectoSubServicio', (okSearchServicio) =>{
      this.obj.subServicio = okSearchServicio.sub
      this.obj.ejecutivo = okSearchServicio.ejecutivo
      this.obj.total = okSearchServicio.total
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      let fechaI = document.getElementById("fechaInicio").value
      let fechaE = document.getElementById("fechaEntrega").value
      let codigo = document.getElementById("codigo").value
      let estado = document.getElementById("estado").value
      let vendedor = document.getElementById("vendedor").value
      let categoria = document.getElementById("categoria").value
      let cliente = document.getElementById("cliente").value

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(vendedor != ""){this.obj.filtro.vendedor=vendedor}else{this.obj.filtro.vendedor= null}   
      if(categoria != ""){this.obj.filtro.categoria = categoria}else{this.obj.filtro.categoria = null}
      if(cliente != ""){this.obj.filtro.cliente =  cliente }else{this.obj.filtro.cliente = null}
      
      this.obj.filtro.estado = estado

      socket.emit('allProyectoSubServicio',this.obj.filtro,this.obj.area)
      socket.on('okAllProyectoSubServicio', (okSearchServicio) =>{
        this.obj.subServicio = okSearchServicio.sub
        this.obj.ejecutivo = okSearchServicio.ejecutivo
        this.obj.total = okSearchServicio.total
        this.trigger(this.obj)
      })
  },
  renderFiltroFi : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaInicio = date
      this.renderFiltro();
    }else{
      document.getElementById("fechaInicio").value = ""
      this.obj.filtro.fechaInicio = undefined
      this.renderFiltro();
    }
  },
  renderFiltroFe : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaEntrega = date
      this.renderFiltro();
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.obj.filtro.fechaEntrega = undefined
      this.renderFiltro();
    }
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100;
    this.renderFiltro();
  },
  renderButton: function(rows,sub){
    if(rows > sub){
      document.getElementById("btn-view").classList.remove("hidden")
    }else{
      document.getElementById("btn-view").classList.add("hidden")
    }
  },
  renderAreaServicio: function(actual,antigua){
    let area = ""
    let area1 = null
    switch (actual) {
    case "abastecimiento":
        area = "abastecimiento"
        break
    case "despacho":
        area = "despacho"
        break
    case "instalación":
        area = "instalaciones"
        break
    case "producción":
        area = "produccion"
        break
    case "planificación":
        area = "planificacion"
        break
    case "sillas":
        area = "sillas"
        break
    case "técnica":
        area = "desarrollo"
        break
    case "comercial":
        area = "comercial"
        break       
    }
    document.querySelector(`[data-area="ok"]`).classList.add(area)
    if(antigua){
      switch (antigua) {
      case "abastecimiento":
          area1 = "abastecimiento"
          break
      case "despacho":
          area1 = "despacho"
          break
      case "instalación":
          area1 = "instalaciones"
          break
      case "producción":
          area1 = "produccion"
          break
      case "planificación":
          area1 = "planificacion"
          break
      case "sillas":
          area1 = "sillas"
          break
      case "técnica":
          area1 = "desarrollo"
          break 
      case "comercial":
          area1 = "comercial"
          break    
      }
      document.querySelector(`[data-area="ok"]`).classList.remove(area)
      document.querySelector(`[data-area="ok"]`).classList.add(area1)
    }
  }
})

export default IndicadorSubServicioStore