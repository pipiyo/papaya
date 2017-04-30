import React from 'react'
import Reflux from 'reflux'
import AddLineaActions from '../actions/AddLineaActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'

const socket = io.connect( `${Env.url}linea` )

let AddLineaStore = Reflux.createStore({
  listenables: [AddLineaActions],
  obj: { 
    rut: '',
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  addLinea: function(ev){
    let linea = {
      "nombre": ev.target.elements['nombre'].value,
      "activo": ev.target.elements['activo'].value ,       
    }
    socket.emit('addLinea', linea, (n) => {

      if(ev.target.elements['nombre']){ev.target.elements['nombre'].value = ""}
      ev.target.elements['activo'].options[0].selected = "selected"

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
  }
  
})

export default AddLineaStore