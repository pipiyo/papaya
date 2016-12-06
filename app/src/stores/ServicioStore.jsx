import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import ServicioActions from '../actions/ServicioActions'

import FormIngresoServicioStore from '../stores/FormIngresoServicioStore'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', mensaje: 'mensaje' },
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
  addServicio: function(data){ 
  	socket.emit('addServicio', data, JSON.stringify( localStorage.getItem('token') ))
  	socket.on('okAddServicio', (okAddServicio) =>{
      this.obj.mensaje = okAddServicio
  		this.trigger(this.obj)
  	})
  }
})

export default ServicioStore