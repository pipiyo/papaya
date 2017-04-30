import React from 'react'
import Reflux from 'reflux'
import AddVehiculoActions from '../actions/AddVehiculoActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'

const socket = io.connect( `${Env.url}vehiculo` )

let AddVehiculoStore = Reflux.createStore({
  listenables: [AddVehiculoActions],
  obj: { 
    rut: '',
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  addVehiculo: function(ev){
    let vehiculo = {
      "patente": ev.target.elements['patente'].value,
      "km": ev.target.elements['km'].value ,
      "m3": ev.target.elements['m3'].value   
    }
    socket.emit('addVehiculo', vehiculo, (n) => {
      this.obj.rut = ""
      if(ev.target.elements['patente']){ev.target.elements['patente'].value = ""}
      if(ev.target.elements['km']){ev.target.elements['km'].value = ""}
      if(ev.target.elements['m3']){ev.target.elements['m3'].value = ""}

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

export default AddVehiculoStore