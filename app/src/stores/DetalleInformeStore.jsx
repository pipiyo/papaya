import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import DetalleInformeActions from '../actions/DetalleInformeActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let DetalleInformeStore = Reflux.createStore({
  listenables: [DetalleInformeActions],
  obj: { 
    comunas: 'comunas', 
    vehiculos: 'vehiculos', 
    subServicio: '',
    renderSubServicio:[],
    renderServicio:[]
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
  allSubServicio: function(data){
  	socket.emit('allSubServicio', data)
  	socket.on('okAllSubServicio', (okAllSubServicio) =>{
  		this.obj.subServicio = okAllSubServicio
      this.renderServicio(this.obj.subServicio.servicio)
      this.renderSubServicio(this.obj.subServicio.sub)
  	})
  },
  validador: function(nombre,validador,fecha){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }
    else{
      text = <div key={nombre} class="opc"><h5>{nombre}</h5><p>{ (fecha)?validador.substring(0,10):validador}</p></div>
    }
    return text
  },
  renderServicio : function(servicio){
    this.obj.renderServicio = []
    this.obj.renderServicio.push(
    this.validador("Area:",servicio[0].NOMBRE_SERVICIO),
    this.validador("Estado:",servicio[0].ESTADO),
    this.validador("Fecha inicio:",servicio[0].FECHA_INICIO,true),
    this.validador("Fecha entrega:",servicio[0].FECHA_ENTREGA,true)
    )
  },
  renderSubServicio: function(sub){
    let valor = 0
    let module = []
    this.obj.renderSubServicio = []
    for (valor in sub){
      module = [
        this.validador("Descripción:",sub[valor].SUB_DESCRIPCION),
        this.validador("Proceso:",sub[valor].SUB_PROCESO),
        this.validador("Fecha Inicio:",sub[valor].SUB_FECHA_INICIO,true),
        this.validador("Fecha Entrega:",sub[valor].SUB_FECHA_ENTREGA,true),
        this.validador("Estado:",sub[valor].SUB_ESTADO),
        this.validador("Supervisor:",sub[valor].SUB_SUPERVISOR),
        this.validador("Dirección:",sub[valor].SUB_DIRECCION),
        this.validador("TP:",sub[valor].SUB_TP),
        this.validador("TO:",sub[valor].SUB_TO),
        this.validador("OS:",sub[valor].SUB_OS),
        this.validador("FI:",sub[valor].SUB_FI)
      ]
      this.obj.renderSubServicio.push(module)
    }
    this.trigger(this.obj)
  },
  renderAreaServicio: function(sub){
    let area
    switch (sub.SUB_NOMBRE_SERVICIO) {
    case "Adquisiciones":
        area = "abastecimiento"
        break
    case "Despacho":
        area = "despacho"
        break
    case "Instalacion":
        area = "instalaciones"
        break
    case "Produccion":
        area = "produccion"
        break
    case "Desarrollo":
        area = "desarrollo"
        break
    case "Sillas":
        area = "sillas"
        break
    }
    document.querySelector(`[data-area="${sub.CODIGO_SUBSERVICIO}"]`).classList.add(area)
  },
  okEstado: function(sub){
    if(sub.SUB_ESTADO == "OK"){ 
      document.querySelector(`[data-estado="${sub.CODIGO_SUBSERVICIO}"]`).classList.add("ok")
    }else{
      document.querySelector(`[data-estado="${sub.CODIGO_SUBSERVICIO}"]`).classList.remove("ok")
    }
  }

  
})

export default DetalleInformeStore