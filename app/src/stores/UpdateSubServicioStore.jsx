import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateSubServicioActions from '../actions/UpdateSubServicioActions'
import moment  from 'moment'
import DialogActions from '../actions/DialogActions'

import ItemProduccion from '../components/update-sub-servicio/ItemProduccion.jsx'
import ItemSillas from '../components/update-sub-servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/update-sub-servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/update-sub-servicio/ItemDespacho.jsx'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let UpdateSubServicioStore = Reflux.createStore({
  listenables: [UpdateSubServicioActions],
  obj: {comunas: 'comunas', 
        vehiculos: 'vehiculos', 
        search: '',
        mensaje: {title:"",texto:"",estado:false},
        input : {codigo:null, categoria:null, supervisor:null, estado:null, dias:null, fechaInicio:null, fechaEntrega:null, descripcion:null, observaciones:null, guia: null, comuna : null, vehiculo: null, direccion: null, m3: null, fi:null, tm:null, to:null, os:null, lider:null, instalador1: null, instalador2: null, instalador3: null, puestos: null, ejecutor:null, vale:null, cantidad:null, proceso:null},
        area : null 
      },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.trigger(this.obj)
    })
  },
  updateSubServicio: function(ev){
    let servicio = {
      "categoria": ev.target.elements['categoria'].value,
      "estado": ev.target.elements['estado'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": ev.target.elements['dias'].value,
      "descripcion": ev.target.elements['descripcion'].value ,
      "observacion": ev.target.elements['observacion'].value,
      "numero": ev.target.elements['numero'].value,
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
    socket.emit('updateSubServicio', servicio)
    socket.on('okUpdateSubServicio', (okUpdateSubServicio) =>{
      /* Dialog */
      this.obj.mensaje.texto = okUpdateSubServicio
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchSubServicio: function(data){
    socket.emit('searchSubServicio', data)
    socket.on('okSearchSubServicio', (okSearchSubServicio) =>{
      this.obj.search = okSearchSubServicio

      this.obj.input.codigo = this.validador(this.obj.search[0].CODIGO_SUBSERVICIO)
      this.obj.input.dias = this.validador(this.obj.search[0].SUB_DIAS)
      this.obj.input.categoria = this.validador(this.obj.search[0].SUB_CATEGORIA)
      this.obj.input.supervisor = this.validador(this.obj.search[0].SUB_SUPERVISOR)
      this.obj.input.estado = this.validador(this.obj.search[0].SUB_ESTADO)
      this.obj.input.fechaInicio = moment(this.obj.search[0].SUB_FECHA_INICIO)
      this.obj.input.fechaEntrega = moment(this.obj.search[0].SUB_FECHA_ENTREGA)
      this.obj.input.descripcion = this.validador(this.obj.search[0].SUB_DESCRIPCION)
      this.obj.input.observaciones = this.validador(this.obj.search[0].SUB_OBSERVACIONES)
      this.obj.input.guia = this.validador(this.obj.search[0].SUB_GUIA_DESPACHO)
      this.obj.input.comuna = this.validador(this.obj.search[0].SUB_CODIGO_COMUNA)
      this.obj.input.vehiculo = this.validador(this.obj.search[0].SUB_TRANSPORTE)
      this.obj.input.direccion = this.validador(this.obj.search[0].SUB_DIRECCION)
      this.obj.input.m3 = this.validador(this.obj.search[0].SUB_M3)
      this.obj.input.proceso = this.validador(this.obj.search[0].SUB_PROCESO)
      this.obj.input.fi = this.validador(this.obj.search[0].SUB_FI)
      this.obj.input.tm = this.validador(this.obj.search[0].SUB_TM)
      this.obj.input.to = this.validador(this.obj.search[0].SUB_TP)
      this.obj.input.os = this.validador(this.obj.search[0].SUB_OS)
      this.obj.input.lider = this.validador(this.obj.search[0].SUB_LIDER)
      this.obj.input.instalador1 = this.validador(this.obj.search[0].SUB_INSTALADOR_1)
      this.obj.input.instalador2 = this.validador(this.obj.search[0].SUB_INSTALADOR_2)
      this.obj.input.instalador3 = this.validador(this.obj.search[0].SUB_INSTALADOR_3)
      this.obj.input.puestos = this.validador(this.obj.search[0].SUB_PUESTOS)
      this.obj.input.ejecutor = this.validador(this.obj.search[0].SUB_EJECUTOR)
      this.obj.input.vale = this.validador(this.obj.search[0].SUB_VALE)
      this.obj.input.cantidad = this.validador(this.obj.search[0].SUB_CANTIDAD)
      this.renderArea(this.obj.search[0].SUB_NOMBRE_SERVICIO)
    })
  },
  renderFechaInicio: function(fecha){
    this.obj.input.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.input.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  renderInput: function(id,valor){
    switch(id) {
      case "numero":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "dias":
        this.obj.input.dias = this.validador(valor)
      break;
      case "supervisor":
        this.obj.input.supervisor = this.validador(valor)
      break;
      case "descripcion":
        this.obj.input.descripcion = this.validador(valor)
      break;
      case "observacion":
        this.obj.input.observaciones = this.validador(valor)
      break;
      case "guia":
        this.obj.input.guia = this.validador(valor)
      break;
      case "direccion":
        this.obj.input.direccion = this.validador(valor)
      break;
      case "m3":
        this.obj.input.m3 = this.validador(valor)
      break;
      case "fi":
        this.obj.input.fi = this.validador(valor)
      break;
      case "tm":
        this.obj.input.tm = this.validador(valor)
      break;
      case "to":
        this.obj.input.to = this.validador(valor)
      break;
      case "os":
        this.obj.input.os = this.validador(valor)
      break;
      case "lider":
        this.obj.input.lider = this.validador(valor)
      break;
      case "puestos":
        this.obj.input.puestos = this.validador(valor)
      break;
      case "instalador1":
        this.obj.input.instalador1 = this.validador(valor)
      break;
      case "instalador2":
        this.obj.input.instalador2 = this.validador(valor)
      break;
      case "instalador3":
        this.obj.input.instalador3 = this.validador(valor)
      break;
      case "os":
        this.obj.input.puestos = this.validador(valor)
      break;
      case "ejecutor":
        this.obj.input.ejecutor = this.validador(valor)
      break;
      case "cantidad":
        this.obj.input.cantidad = this.validador(valor)
      break;
      case "vale":
        this.obj.input.vale = this.validador(valor)
      break; 
    }   
    this.renderArea(this.obj.search[0].SUB_NOMBRE_SERVICIO)  
  },
  renderArea: function(area){
    switch(area) {
      case "Produccion":
        this.obj.area= <ItemProduccion input={this.obj.input} />
      break;
      case "Instalacion":
        this.obj.area = <ItemInstalacion input={this.obj.input} comunas={this.obj.comunas} />
      break;
      case "Sillas":
        this.obj.area = <ItemSillas input={this.obj.input} comunas={this.obj.comunas} />
      break;
      case "Despacho":
        this.obj.area = <ItemDespacho input={this.obj.input} comunas={this.obj.comunas} vehiculos={this.obj.vehiculos} /> 
      break;
      default:
       this.obj.area = ""
      }
    this.trigger(this.obj)
  },
  selectOption: function(numero, seleccion, tipo){
    let i
    for(i = 0; numero.length > i; i++){
      if(tipo){
        if(numero.options[i].value.toLowerCase() == seleccion.toLowerCase()){numero.options[i].selected = "selected"}
      }else{
        if(numero.options[i].value == seleccion){numero.options[i].selected = "selected"}
      }
    }
  },
  validador: function(validador,fecha){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }
    else{
      text = (fecha)?validador.substring(0,10):validador
    }
    return text
  }
  
})

export default UpdateSubServicioStore