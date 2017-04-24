import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateClienteActions from '../actions/UpdateClienteActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'

const socket = io.connect( `${Env.url}cliente` )

let UpdateClienteStore = Reflux.createStore({
  listenables: [UpdateClienteActions],
  obj: { 
    search: '',
    id: '',
    input: {rut: "", nombre: "", razon: "", giro: "", direccion: "", contacto: "", pago: "", telefono1: "", telefono2: "", mail: ""},
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  updateCliente: function(ev){
    let cliente = {
      "codigo": this.obj.id,
      "rut": ev.target.elements['rut'].value,
      "nombre": ev.target.elements['nombre'].value ,
      "razon": ev.target.elements['razon'].value,
      "giro": ev.target.elements['giro'].value,
      "direccion": ev.target.elements['direccion'].value,
      "contacto": ev.target.elements['contacto'].value,
      "pago": ev.target.elements['pago'].value,
      "telefono1": ev.target.elements['telefono1'].value,
      "telefono2": ev.target.elements['telefono2'].value,
      "mail": ev.target.elements['mail'].value         
    }
    socket.emit('updateCliente', cliente, (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */

      browserHistory.push(`/home/listado-cliente`)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchCliente: function(id){
    socket.emit('searchCliente', id, (n) => {
      this.obj.search = n.cliente
      this.obj.id = id
      this.obj.input.rut = this.validador(this.obj.search[0].RUT_CLIENTE)
      this.obj.input.nombre = this.validador(this.obj.search[0].NOMBRE_CLIENTE)
      this.obj.input.razon = this.validador(this.obj.search[0].RAZON_SOCIAL)
      this.obj.input.giro = this.validador(this.obj.search[0].GIRO)
      this.obj.input.direccion = this.validador(this.obj.search[0].DIRECCION)
      this.obj.input.contacto = this.validador(this.obj.search[0].CONTACTO1)
      this.obj.input.pago = this.validador(this.obj.search[0].FORMA_PAGO)
      this.obj.input.telefono1= this.validador(this.obj.search[0].TELEFONO1)
      this.obj.input.telefono2= this.validador(this.obj.search[0].TELEFONO2)
      this.obj.input.mail= this.validador(this.obj.search[0].CELULAR_CONTACTO1)
      this.trigger(this.obj)
    })
  },
  renderInput: function(id,valor){
    switch(id) {
      case "rut":
       this.obj.input.rut = chileanRut.format(valor,true)
      break;
      case "nombre":
       this.obj.input.nombre = this.validador(valor)
      break;
      case "razon":
       this.obj.input.razon = this.validador(valor)
      break;
      case "giro":
       this.obj.input.giro = this.validador(valor)
      break;
      case "direccion":
        this.obj.input.direccion = this.validador(valor)
      break;
      case "contacto":
        this.obj.input.contacto = this.validador(valor)
      break;
      case "pago":
        this.obj.input.pago = this.validador(valor)
      break;
      case "telefono1":
        this.obj.input.telefono1 = this.validador(valor)
      break;
      case "telefono2":
        this.obj.input.telefono2 = this.validador(valor)
      break;
      case "mail":
        this.obj.input.mail = this.validador(valor)
      break;
    }
    this.trigger(this.obj)    
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

export default UpdateClienteStore