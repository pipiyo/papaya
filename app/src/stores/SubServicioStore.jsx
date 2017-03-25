import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import DialogActions from '../actions/DialogActions'

import SubServicioActions from '../actions/SubServicioActions'

import ItemProduccion from '../components/sub-servicio/ItemProduccion.jsx'
import ItemSillas from '../components/sub-servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/sub-servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/sub-servicio/ItemDespacho.jsx'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let SubServicioStore = Reflux.createStore({
  listenables: [SubServicioActions],
  obj: { 
    comunas: 'comunas',
    vehiculos: 'vehiculos', 
    mensaje: {title:"",texto:"",estado:false},
    item: {fecha : { fechaInicio:moment(), fechaEntrega:moment() } },
    area: null
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
      this.obj.search = ''
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
      this.obj.search = ''
      this.trigger(this.obj)
    })
    
  },
  addSubServicio: function(ev,id){
    let servicio = {
      "codigo_servicio": id,
      "area": ev.target.elements['area'].value,
      "categoria": ev.target.elements['categoria'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": ev.target.elements['dias'].value,
      "descripcion": ev.target.elements['descripcion'].value ,
      "observacion": ev.target.elements['observacion'].value,
      "rocha": "",
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
      "cantidad" : (ev.target.elements['cantidad']) ? ev.target.elements['cantidad'].value : ""          
    }
    socket.emit('addSubServicio', servicio, JSON.stringify( localStorage.getItem('token') ))
    socket.on('okAddSubServicio', (okAddSubServicio) =>{
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
      this.obj.mensaje.texto = okAddSubServicio
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
      this.trigger(this.obj)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  renderFechaInicio: function(fecha){
    this.obj.item.fecha.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.item.fecha.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  renderArea: function(area){
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
      default:
       this.obj.area = ""
      }
    this.trigger(this.obj)
  }
})

export default SubServicioStore