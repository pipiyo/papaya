import React from 'react'
import Reflux from 'reflux'
import AddProveedorActions from '../actions/AddProveedorActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'

const socket = io.connect( `${Env.url}proveedor` )

let AddProveedorStore = Reflux.createStore({
  listenables: [AddProveedorActions],
  obj: { 
    rut: '',
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  addProveedor: function(ev){
    let proveedor = {
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
    socket.emit('addProveedor', proveedor, (n) => {

      this.obj.rut = ""
      if(ev.target.elements['nombre']){ev.target.elements['nombre'].value = ""}
      if(ev.target.elements['razon']){ev.target.elements['razon'].value = ""}
      if(ev.target.elements['giro']){ev.target.elements['giro'].value = ""}
      if(ev.target.elements['direccion']){ev.target.elements['direccion'].value = ""}
      if(ev.target.elements['contacto']){ev.target.elements['contacto'].value = ""}
      if(ev.target.elements['pago']){ev.target.elements['pago'].value = ""}
      if(ev.target.elements['telefono1']){ev.target.elements['telefono1'].value = ""}
      if(ev.target.elements['telefono2']){ev.target.elements['telefono2'].value = ""}
      if(ev.target.elements['mail']){ev.target.elements['mail'].value = ""}  
      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
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
  renderInput: function(id,valor){
    switch(id) {
      case "rut":
       this.obj.rut = chileanRut.format(valor,true)
      break;
    }
    this.trigger(this.obj)    
  }
  
})

export default AddProveedorStore