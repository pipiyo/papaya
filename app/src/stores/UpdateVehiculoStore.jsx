import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateVehiculoActions from '../actions/UpdateVehiculoActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'

const socket = io.connect( `${Env.url}vehiculo` )

let UpdateVehiculoStore = Reflux.createStore({
  listenables: [UpdateVehiculoActions],
  obj: { 
    search: '',
    id: '',
    input: {patente: "", km: "", m3: ""},
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  updateVehiculo: function(ev){
    let Vehiculo = {
      "codigo": this.obj.id,
      "patente": ev.target.elements['patente'].value,
      "km": ev.target.elements['km'].value,
      "m3": ev.target.elements['m3'].value
    }
    socket.emit('updateVehiculo', Vehiculo, (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */

      browserHistory.push(`/home/listado-vehiculo`)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchVehiculo: function(id){
    socket.emit('searchVehiculo', id, (n) => {
      this.obj.search = n.vehiculo
      this.obj.id = id
      this.obj.input.patente = this.validador(this.obj.search[0].PATENTE)
      this.obj.input.km = this.validador(this.obj.search[0].KM_INICIO)
      this.obj.input.m3 = this.validador(this.obj.search[0].M3)
      this.trigger(this.obj)
    })
  },
  renderInput: function(id,valor){
    switch(id) {
      case "patente":
       this.obj.input.patente = this.validador(valor)
      break;
      case "km":
       this.obj.input.km = this.validador(valor)
      break;
      case "m3":
       this.obj.input.m3 = this.validador(valor)
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

export default UpdateVehiculoStore