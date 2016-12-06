import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import ServicioActions from '../actions/ServicioActions'
import FormIngresoServicioStore from '../stores/FormIngresoServicioStore'

import ItemProduccion from '../components/servicio/ItemProduccion.jsx'
import ItemSillas from '../components/servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/servicio/ItemDespacho.jsx'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  obj: { 
    comunas: 'comunas', 
    vehiculos: 'vehiculos', 
    mensaje: 'mensaje',
    item: { reclamo:'', fecha : { fechaInicio:moment(), fechaEntrega:moment() } },
    area: null
  },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
      this.trigger(this.obj)
    })
  },
  addServicio: function(ev){
    let servicio = {
      "reclamo": (ev.target.elements['reclamo']) ? ev.target.elements['reclamo'].value : "",
      "area": ev.target.elements['area'].value,
      "categoria": ev.target.elements['categoria'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": ev.target.elements['dias'].value,
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
      "cantidad" : (ev.target.elements['cantidad']) ? ev.target.elements['cantidad'].value : ""          
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
      this.obj.mensaje = okAddServicio
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

export default ServicioStore