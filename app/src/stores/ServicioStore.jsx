import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import ServicioActions from '../actions/ServicioActions'
import DialogActions from '../actions/DialogActions'

import ItemProduccion from '../components/servicio/ItemProduccion.jsx'
import ItemSillas from '../components/servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/servicio/ItemDespacho.jsx'
import ItemAbastecimiento from '../components/servicio/ItemAbastecimiento.jsx'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  obj: { 
    comunas: 'comunas', 
    vehiculos: 'vehiculos', 
    mensaje: {title:"",texto:"",estado:false},
    item: { reclamo:'', fecha : { fechaInicio:moment(), fechaEntrega:moment(),fechaMetales:moment(),fechaMuebles:moment(), fechaEspeciales:moment(), fechaSillas:moment(), fechaTela:moment(), fechaVidrio:moment(), fechaInsumo:moment(), fechaImportado:moment()  } },
    area: null,
    areaName: null
  },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje.texto = ''
      this.obj.mensaje.title = ''
      this.obj.mensaje.estado = false
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje.texto = ''
      this.obj.mensaje.title = ''
      this.obj.mensaje.estado = false
      this.trigger(this.obj)
    })
  },
  sumaFecha : function(dias, fecha){
    let new_date = moment(fecha, "YYYY-MM-DD").add(dias, 'days');
    return new_date.format("YYYY-MM-DD");
  },
  fechaEntrega(area,fechaI,fechaE){
    let fechaEntrega
    switch(area) {
      case "Adquisiciones":
        fechaEntrega = this.sumaFecha(2,fechaI)
      break;
      default:
        fechaEntrega = fechaE
      }
      return fechaEntrega
  },

  addServicio: function(ev){
    let servicio = {
      "reclamo": (ev.target.elements['reclamo']) ? ev.target.elements['reclamo'].value : "",
      "area": ev.target.elements['area'].value,
      "categoria": ev.target.elements['categoria'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": this.fechaEntrega(ev.target.elements['area'].value,ev.target.elements['fechaInicio'].value,ev.target.elements['fechaEntrega'].value),  
      "dias": "0",
      "descripcion": ev.target.elements['descripcion'].value ,
      "observacion": ev.target.elements['observacion'].value,
      "rocha": ev.target.elements['rocha'].value,
      "direccion" : (ev.target.elements['direccion']) ? ev.target.elements['direccion'].value : "",
      "guia" : (ev.target.elements['guia'] ) ? ev.target.elements['guia'].value : "",
      "comuna" : (ev.target.elements['comuna']) ? ev.target.elements['comuna'].value : "",
      "m3" : (ev.target.elements['m3']) ? ev.target.elements['m3'].value : "",
      "fi" : (ev.target.elements['fi']) ? ev.target.elements['fi'].value : "",
      "tm" : (ev.target.elements['tm']) ? ev.target.elements['tm'].value : "",
      "to" : (ev.target.elements['to']) ? ev.target.elements['to'].value : "",
      "os" : (ev.target.elements['os']) ? ev.target.elements['os'].value : "",
      "lider" : (ev.target.elements['lider']) ? ev.target.elements['lider'].value : "",  
      "puestos" : (ev.target.elements['puestos']) ? ev.target.elements['puestos'].value : "",   
      "instalador1" : (ev.target.elements['instalador1']) ? ev.target.elements['instalador1'].value : "",
      "instalador2" : (ev.target.elements['instalador2']) ? ev.target.elements['instalador2'].value : "",  
      "instalador3" : (ev.target.elements['instalador3']) ? ev.target.elements['instalador3'].value : "",   
      "proceso" : (ev.target.elements['proceso']) ? ev.target.elements['proceso'].value : "",  
      "vale" : (ev.target.elements['vale']) ? ev.target.elements['vale'].value : "",
      "ejecutor" : (ev.target.elements['ejecutor']) ? ev.target.elements['ejecutor'].value : "", 
      "vehiculo" : (ev.target.elements['vehiculo']) ? ev.target.elements['vehiculo'].value : "", 
      "cantidad" : (ev.target.elements['cantidad']) ? ev.target.elements['cantidad'].value : "",
      "checkMetales" : (ev.target.elements['check-metales']) ? (ev.target.elements['check-metales'].checked) ? ev.target.elements['check-metales'].value : "" : "",
      "checkMuebles" : (ev.target.elements['check-muebles']) ? (ev.target.elements['check-muebles'].checked) ? ev.target.elements['check-muebles'].value : "" : "",
      "checkEspeciales" : (ev.target.elements['check-especiales']) ? (ev.target.elements['check-especiales'].checked) ? ev.target.elements['check-especiales'].value : "" : "",  
      "checkSillas" : (ev.target.elements['check-sillas']) ? (ev.target.elements['check-sillas'].checked) ? ev.target.elements['check-sillas'].value : "" : "",
      "checkTela" : (ev.target.elements['check-tela']) ? (ev.target.elements['check-tela'].checked) ? ev.target.elements['check-tela'].value : "" : "", 
      "checkVidrio" : (ev.target.elements['check-vidrio']) ? (ev.target.elements['check-vidrio'].checked) ? ev.target.elements['check-vidrio'].value : "" : "",  
      "checkInsumo" : (ev.target.elements['check-insumo']) ? (ev.target.elements['check-insumo'].checked) ? ev.target.elements['check-insumo'].value : "" : "", 
      "checkImportado" : (ev.target.elements['check-importado']) ? (ev.target.elements['check-importado'].checked) ? ev.target.elements['check-importado'].value : "" : "",
      "fechaMetales" : (ev.target.elements['fecha-metales']) ? ev.target.elements['fecha-metales'].value : "",   
      "fechaMuebles" : (ev.target.elements['fecha-muebles']) ? ev.target.elements['fecha-muebles'].value : "",  
      "fechaEspeciales" : (ev.target.elements['fecha-especiales']) ? ev.target.elements['fecha-especiales'].value : "",
      "fechaSillas" : (ev.target.elements['fecha-sillas']) ? ev.target.elements['fecha-sillas'].value : "", 
      "fechaTela" : (ev.target.elements['fecha-tela']) ? ev.target.elements['fecha-tela'].value : "", 
      "fechaVidrio" : (ev.target.elements['fecha-vidrio']) ? ev.target.elements['fecha-vidrio'].value : "",
      "fechaInsumo" : (ev.target.elements['fecha-insumo']) ? ev.target.elements['fecha-insumo'].value : "", 
      "fechaImportado" : (ev.target.elements['fecha-importado']) ? ev.target.elements['fecha-importado'].value : ""

    }

  	socket.emit('addServicio', servicio, JSON.stringify( localStorage.getItem('token') ))
  	socket.on('okAddServicio', (okAddServicio) =>{

      if(ev.target.elements['area']){ev.target.elements['area'].options[0].selected = "selected"}
      if(ev.target.elements['categoria']){ev.target.elements['categoria'].options[0].selected = "selected"}
      if(ev.target.elements['fechaInicio']){ev.target.elements['fechaInicio'].value = ""}
      if(ev.target.elements['fechaEntrega']){ev.target.elements['fechaEntrega'].value = ""}
      if(ev.target.elements['supervisor']){ev.target.elements['supervisor'].value = ""}
      if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
      if(ev.target.elements['observacion']){ev.target.elements['observacion'].value = ""}
      if(ev.target.elements['dias']){ev.target.elements['dias'].value = ""}
        
      this.obj.area = ""

      /* Dialog */
      this.obj.mensaje.texto = okAddServicio
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
  		this.trigger(this.obj)
  	})
  },
  renderReclamo: function(reclamo){
    if(reclamo == "reclamo"){
      this.obj.item.reclamo = <div className="item-form"><label>Reclamo</label><input id="reclamo" type="text" /></div>
    }else{
      this.obj.item.reclamo = ""
    }
    this.trigger(this.obj)
  },
  renderRochaValue: function(rocha){
    if(rocha != "ingreso"){
      document.getElementById("rocha").value = rocha
    }
  },
  renderFechaInicio: function(fecha){
    this.obj.item.fecha.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.item.fecha.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  renderFechaMetales: function(fecha){
    this.obj.item.fecha.fechaMetales = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaMuebles: function(fecha){
    this.obj.item.fecha.fechaMuebles = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaEspeciales: function(fecha){
    this.obj.item.fecha.fechaEspeciales = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaSillas: function(fecha){
    this.obj.item.fecha.fechaSillas = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaTela: function(fecha){
    this.obj.item.fecha.fechaTela = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaVidrio: function(fecha){
    this.obj.item.fecha.fechaVidrio = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaInsumo: function(fecha){
    this.obj.item.fecha.fechaInsumo = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  renderFechaImportado: function(fecha){
    this.obj.item.fecha.fechaImportado = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.areaName )
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  renderArea: function(area){
    this.obj.areaName = area
    switch(area) {
      case "Produccion":
        this.obj.area= <ItemProduccion />
      break;
      case "Instalacion":
        this.obj.area = <ItemInstalacion comunas={this.obj.comunas} />
      break;
      case "Sillas":
        this.obj.area = <ItemSillas comunas={this.obj.comunas} />
      break;
      case "Despacho":
        this.obj.area = <ItemDespacho comunas={this.obj.comunas} vehiculos={this.obj.vehiculos} /> 
      break;
      case "Adquisiciones":
        this.obj.area = <ItemAbastecimiento fecha={this.obj.item.fecha} /> 
      break;
      default:
       this.obj.area = ""
      }
    this.trigger(this.obj)
  }

})

export default ServicioStore