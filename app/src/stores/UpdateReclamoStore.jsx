import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateReclamoActions from '../actions/UpdateReclamoActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'
import moment  from 'moment'

const socket = io.connect( `${Env.url}reclamo` )

let UpdateReclamoStore = Reflux.createStore({
  listenables: [UpdateReclamoActions],
  obj: { 
    search: '',
    id: '',
    input: {codigo: "", rocha: "", area: "", area1: "", area2: "", razon: "", fechaInicio: "", fechaEntrega: "", estado : ""},
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  updateReclamo: function(ev){
    let reclamo = {
      "codigo": this.obj.id,
      "rocha": ev.target.elements['rocha'].value,
      "area": ev.target.elements['area'].value,
      "area1": ev.target.elements['area1'].value,
      "razon": ev.target.elements['razon'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,
      "estado": ev.target.elements['estado'].value 
    }
    socket.emit('updateReclamo', reclamo, (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */

      browserHistory.push(`/home/listado-reclamo`)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchReclamo: function(id){
    socket.emit('searchReclamo', id, (n) => {
      this.obj.search = n.reclamo
      this.obj.id = id
      this.obj.input.codigo = this.validador(this.obj.search[0].CODIGO_RECLAMO)
      this.obj.input.rocha = this.validador(this.obj.search[0].ROCHA)
      this.obj.input.area = this.validador(this.obj.search[0].AREA)
      this.obj.input.area1 = this.validador(this.obj.search[0].AREA1)
      this.obj.input.area2 = this.validador(this.obj.search[0].AREA2)
      this.obj.input.razon = this.validador(this.obj.search[0].RAZON)
      this.obj.input.estado = this.validador(this.obj.search[0].ESTADO)
      this.obj.input.fechaInicio= (moment(this.obj.search[0].FECHA_INICIO).isValid())?moment(this.obj.search[0].FECHA_INICIO):undefined 
      this.obj.input.fechaEntrega= (moment(this.obj.search[0].FECHA_TERMINO).isValid())?moment(this.obj.search[0].FECHA_TERMINO):undefined 
      this.trigger(this.obj)
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
      case "codigo":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "rocha":
       this.obj.input.rocha = this.validador(valor)
      break;
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
  validador: function(validador){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }else{
      text = validador
    }
    return text
  }
  
})

export default UpdateReclamoStore