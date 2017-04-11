import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/indicador-servicio/Item.jsx'

import IndicadorServicioActions from '../actions/IndicadorServicioActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let IndicadorServicioStore = Reflux.createStore({
  listenables: [IndicadorServicioActions],
  obj: { 
    servicio : "",
    ejecutivo: [],
    total: [],
    area: "",
    button: "",
    renderItem: [],
    filtro:{fechaInicio:undefined,fechaEntrega: undefined, codigo: null, estado: "EN PROCESO", vendedor: null, categoria: null, cliente: null, servicio: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    if(document.getElementById("cliente")){document.getElementById("cliente").value}
    if(document.getElementById("servicio")){document.getElementById("cliente").value}
    if(document.getElementById("fechaInicio")){document.getElementById("fechaInicio").value = ""}
    if(document.getElementById("fechaEntrega")){document.getElementById("fechaEntrega").value = ""}
    if(document.getElementById("codigo")){document.getElementById("codigo").value = ""}
    if(document.getElementById("estado")){document.getElementById("estado").options[0].selected = "selected"}
    if(document.getElementById("vendedor")){document.getElementById("vendedor").options[0].selected = "selected"}
    if(document.getElementById("categoria")){document.getElementById("categoria").options[0].selected = "selected"}
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.servicio = ''
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.servicio = null
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = null
    this.obj.filtro.categoria = null
    this.obj.filtro.cliente = null 
  },
  renderResetMount: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.servicio = ''
    this.obj.filtro.servicio = null
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = null
    this.obj.filtro.categoria = null
    this.obj.filtro.cliente = null 
  },
  renderServicio: function(area){
    this.obj.area = area
    socket.emit('allProyectoServicio',this.obj.filtro,this.obj.area, (n) => {
      this.obj.servicio = n.sub
      this.obj.ejecutivo = n.ejecutivo
      this.obj.total = n.total
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
      let vendedor = document.getElementById("vendedor").value
      let categoria = document.getElementById("categoria").value
      let cliente = document.getElementById("cliente").value
      let servicio = (document.getElementById("servicio"))?document.getElementById("servicio").value:""

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(vendedor != ""){this.obj.filtro.vendedor=vendedor}else{this.obj.filtro.vendedor= null}   
      if(categoria != ""){this.obj.filtro.categoria = categoria}else{this.obj.filtro.categoria = null}
      if(cliente != ""){this.obj.filtro.cliente =  cliente }else{this.obj.filtro.cliente = null}
      if(servicio != ""){this.obj.filtro.servicio = servicio }else{this.obj.filtro.servicio = null}

      this.obj.filtro.estado = estado
      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allProyectoServicio',this.obj.filtro,this.obj.area, (n) => {
        this.obj.servicio = n.sub
        this.obj.ejecutivo = n.ejecutivo
        this.obj.total = n.total
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
    this.renderServicio(this.obj.area)
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
  renderAreaServicio: function(actual,antigua){
    let area = ""
    let area1 = null
    if(document.querySelector(`[data-area="ok"]`)){
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
      case "técnica-especial":
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
        case "técnica-especial":
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
  },
  fechaActual: function(){
    let hoy = new Date()
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 
    return yyyy+'-'+mm+'-'+dd
  },
  renderItem: function(){
    let i
      for(i=0;this.obj.servicio.length > i ;i++){
        this.obj.renderItem.push(<Item key={this.obj.servicio[i].CODIGO_SERVICIO} fecha={this.fechaActual()} datos={this.obj.servicio[i]} />)
      } 
  }
})

export default IndicadorServicioStore