import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateServicioActions from '../actions/UpdateServicioActions'
import moment  from 'moment'
import DialogActions from '../actions/DialogActions'

import ItemProduccion from '../components/update-servicio/ItemProduccion.jsx'
import ItemSillas from '../components/update-servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/update-servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/update-servicio/ItemDespacho.jsx'
import ItemAbastecimiento from '../components/update-servicio/ItemAbastecimiento.jsx'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let UpdateServicioStore = Reflux.createStore({
  listenables: [UpdateServicioActions],
  obj: {comunas: 'comunas', 
        vehiculos: 'vehiculos', 
        servicio: '',
        subServicio: '',
        mensaje: {title:"",texto:"",estado:false},
        input : {codigo:null, categoria:null, supervisor:null, estado:null, dias:null, fechaInicio:null, fechaEntrega:null, descripcion:null, observaciones:null, guia: null, comuna : null, vehiculo: null, direccion: null, m3: null, fi:null, tm:null, to:null, os:null, lider:null, instalador1: null, instalador2: null, instalador3: null, puestos: null, ejecutor:null, vale:null, cantidad:null, proceso:null},
        area : null,
        item: {fecha : { fechaMetales:moment(),fme:false,fme1:false,fechaMuebles:moment(),fmu:false,fmu1:false,fechaEspeciales:moment(),fes:false,fes1:false, fechaSillas:moment(),fsi:false,fsi1:false, fechaTela:moment(),fte:false,fte1:false, fechaVidrio:moment(),fvi:false,fvi1:false, fechaInsumo:moment(),fin:false,fin1:false, fechaImportado:moment(),fim:false,fim1:false } },
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
  updateServicio: function(ev){
    let servicio = {
      "categoria": ev.target.elements['categoria'].value,
      "estado": ev.target.elements['estado'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": "0",
      "rocha": this.obj.servicio[0].CODIGO_PROYECTO,
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
      "cantidad" : (ev.target.elements['cantidad']) ? ev.target.elements['cantidad'].value : "",
      "checkMetales" : (ev.target.elements['check-metales'] && ev.target.elements['check-metales'].disabled == false) ? (ev.target.elements['check-metales'].checked) ? ev.target.elements['check-metales'].value : "" : "",
      "checkMuebles" : (ev.target.elements['check-muebles'] && ev.target.elements['check-muebles'].disabled == false) ? (ev.target.elements['check-muebles'].checked) ? ev.target.elements['check-muebles'].value : "" : "",
      "checkEspeciales" : (ev.target.elements['check-especiales'] && ev.target.elements['check-especiales'].disabled == false ) ? (ev.target.elements['check-especiales'].checked) ? ev.target.elements['check-especiales'].value : "" : "",  
      "checkSillas" : (ev.target.elements['check-sillas'] && ev.target.elements['check-sillas'].disabled == false) ? (ev.target.elements['check-sillas'].checked) ? ev.target.elements['check-sillas'].value : "" : "",
      "checkTela" : (ev.target.elements['check-tela'] && ev.target.elements['check-tela'].disabled == false ) ? (ev.target.elements['check-tela'].checked) ? ev.target.elements['check-tela'].value : "" : "", 
      "checkVidrio" : (ev.target.elements['check-vidrio'] && ev.target.elements['check-vidrio'].disabled == false ) ? (ev.target.elements['check-vidrio'].checked) ? ev.target.elements['check-vidrio'].value : "" : "",  
      "checkInsumo" : (ev.target.elements['check-insumo'] && ev.target.elements['check-insumo'].disabled == false) ? (ev.target.elements['check-insumo'].checked) ? ev.target.elements['check-insumo'].value : "" : "", 
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
    socket.emit('updateServicio',servicio, JSON.stringify( localStorage.getItem('token')))
    socket.on('okUpdateServicio', (okUpdateServicio) =>{
      /* Dialog */
        this.obj.mensaje.texto = okUpdateServicio
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
  searchServicio: function(id){
  	socket.emit('searchServicio', id)
  	socket.on('okSearchServicio', (okSearchServicio) =>{
      this.obj.servicio = okSearchServicio.servicio
      this.obj.subServicio = okSearchServicio.sub
      this.obj.input.codigo = this.validador(this.obj.servicio[0].CODIGO_SERVICIO)
      this.obj.input.dias = this.validador(this.obj.servicio[0].DIAS)
      this.obj.input.categoria = this.validador(this.obj.servicio[0].CATEGORIA)
      this.obj.input.supervisor = this.validador(this.obj.servicio[0].SUPERVISOR)
      this.obj.input.estado = this.validador(this.obj.servicio[0].ESTADO)
      this.obj.input.fechaInicio = (moment(this.obj.servicio[0].FECHA_INICIO).isValid())?moment(this.obj.servicio[0].FECHA_INICIO):undefined 
      this.obj.input.fechaEntrega = (moment(this.obj.servicio[0].FECHA_ENTREGA).isValid())?moment(this.obj.servicio[0].FECHA_ENTREGA):undefined 
      this.obj.input.descripcion = this.validador(this.obj.servicio[0].DESCRIPCION)
      this.obj.input.observaciones = this.validador(this.obj.servicio[0].OBSERVACIONES)
      this.obj.input.guia = this.validador(this.obj.servicio[0].GUIA_DESPACHO)
      this.obj.input.comuna = this.validador(this.obj.servicio[0].CODIGO_COMUNA)
      this.obj.input.vehiculo = this.validador(this.obj.servicio[0].TRANSPORTE)
      this.obj.input.direccion = this.validador(this.obj.servicio[0].DIRECCION)
      this.obj.input.m3 = this.validador(this.obj.servicio[0].M3)
      this.obj.input.proceso = this.validador(this.obj.servicio[0].PROCESO)
      this.obj.input.fi = this.validador(this.obj.servicio[0].FI)
      this.obj.input.tm = this.validador(this.obj.servicio[0].TM)
      this.obj.input.to = this.validador(this.obj.servicio[0].TP)
      this.obj.input.os = this.validador(this.obj.servicio[0].OS)
      this.obj.input.lider = this.validador(this.obj.servicio[0].LIDER)
      this.obj.input.instalador1 = this.validador(this.obj.servicio[0].INSTALADOR_1)
      this.obj.input.instalador2 = this.validador(this.obj.servicio[0].INSTALADOR_2)
      this.obj.input.instalador3 = this.validador(this.obj.servicio[0].INSTALADOR_3)
      this.obj.input.puestos = this.validador(this.obj.servicio[0].PUESTOS)
      this.obj.input.ejecutor = this.validador(this.obj.servicio[0].EJECUTOR)
      this.obj.input.vale = this.validador(this.obj.servicio[0].VALE)
      this.obj.input.cantidad = this.validador(this.obj.servicio[0].CANTIDAD)
      this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  	})
  },
  subServicioFecha: function(sub){
    this.obj.item.fecha.fme = false
    this.obj.item.fecha.fme1 = false
    this.obj.item.fecha.fechaMetales = moment()
    this.obj.item.fecha.fmu = false
    this.obj.item.fecha.fmu1 = false
    this.obj.item.fecha.fechaMuebles = moment()
    this.obj.item.fecha.fes = false
    this.obj.item.fecha.fes1 = false
    this.obj.item.fecha.fechaEspeciales = moment()
    this.obj.item.fecha.fsi = false
    this.obj.item.fecha.fsi1 = false
    this.obj.item.fecha.fechaSillas = moment()
    this.obj.item.fecha.fte = false
    this.obj.item.fecha.fte1 = false
    this.obj.item.fecha.fechaTela = moment()
    this.obj.item.fecha.fvi = false
    this.obj.item.fecha.fvi1 = false
    this.obj.item.fecha.fechaVidrio = moment()
    this.obj.item.fecha.fin = false
    this.obj.item.fecha.fin1 = false
    this.obj.item.fecha.fechaInsumo = moment()
    this.obj.item.fecha.fim = false
    this.obj.item.fecha.fim1 = false
    this.obj.item.fecha.fechaImportado = moment()
    let i 
    for(i=0; sub.length > i; i++){
      switch(sub[i].SUB_DESCRIPCION) {
        case "Comprar Metales":
          this.obj.item.fecha.fme = true
          this.obj.item.fecha.fme1 = true
          this.obj.item.fecha.fechaMetales = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Muebles":
          this.obj.item.fecha.fmu = true
          this.obj.item.fecha.fmu1 = true
          this.obj.item.fecha.fechaMuebles = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Especiales":
          this.obj.item.fecha.fes = true
          this.obj.item.fecha.fes1 = true
          this.obj.item.fecha.fechaEspeciales = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Sillas":
          this.obj.item.fecha.fsi = true
          this.obj.item.fecha.fsi1 = true
          this.obj.item.fecha.fechaSillas = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Tela":
          this.obj.item.fecha.fte = true
          this.obj.item.fecha.fte1 = true
          this.obj.item.fecha.fechaTela = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Vidrio":
          this.obj.item.fecha.fvi = true
          this.obj.item.fecha.fvi1 = true
          this.obj.item.fecha.fechaVidrio = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Insumo":
          this.obj.item.fecha.fin = true
          this.obj.item.fecha.fin1 = true
          this.obj.item.fecha.fechaInsumo = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
        case "Comprar Importado":
          this.obj.item.fecha.fim = true
          this.obj.item.fecha.fim1 = true
          this.obj.item.fecha.fechaImportado = moment(sub[i].SUB_FECHA_ENTREGA)
        break;
      }
    }
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
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
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)     
  },
  renderFechaInicio: function(fecha){
    this.obj.input.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.input.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  renderFechaMetales: function(fecha){
    this.obj.item.fecha.fechaMetales = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaMuebles: function(fecha){
    this.obj.item.fecha.fechaMuebles = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaEspeciales: function(fecha){
    this.obj.item.fecha.fechaEspeciales = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaSillas: function(fecha){
    this.obj.item.fecha.fechaSillas = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaTela: function(fecha){
    this.obj.item.fecha.fechaTela = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaVidrio: function(fecha){
    this.obj.item.fecha.fechaVidrio = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaInsumo: function(fecha){
    this.obj.item.fecha.fechaInsumo = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderFechaImportado: function(fecha){
    this.obj.item.fecha.fechaImportado = fecha
    this.trigger(this.obj)
    this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
  },
  renderCheck: function(ev){
    switch(ev.target.id) {
        case "check-metales":
          this.obj.item.fecha.fme1 = (this.obj.item.fecha.fme1 ) ? false  : true
        break;
        case "check-muebles":
          this.obj.item.fecha.fmu1 = (this.obj.item.fecha.fmu1 ) ? false  : true
        break;
        case "check-especiales":
          this.obj.item.fecha.fes1 = (this.obj.item.fecha.fes1 ) ? false  : true
        break;
        case "check-sillas":
          this.obj.item.fecha.fsi1 = (this.obj.item.fecha.fsi1 ) ? false  : true
        break;
        case "check-tela":
          this.obj.item.fecha.fte1 = (this.obj.item.fecha.fte1 ) ? false  : true
        break;
        case "check-vidrio":
          this.obj.item.fecha.fvi1 = (this.obj.item.fecha.fvi1 ) ? false  : true
        break;
        case "check-insumo":
          this.obj.item.fecha.fin1 = (this.obj.item.fecha.fin1 ) ? false  : true
        break;
        case "check-importado":
          this.obj.item.fecha.fim1 = (this.obj.item.fecha.fim1 ) ? false  : true
        break;
      }
      this.renderArea(this.obj.servicio[0].NOMBRE_SERVICIO)
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
      case "Adquisiciones":
        this.obj.area = <ItemAbastecimiento fecha={this.obj.item.fecha} /> 
      break;
      default:
       this.obj.area = ""
      }
    this.trigger(this.obj)
  } 
})

export default UpdateServicioStore