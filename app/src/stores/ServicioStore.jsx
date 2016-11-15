import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import ServicioActions from '../actions/ServicioActions'

import FormIngresoServicioStore from '../stores/FormIngresoServicioStore'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', mensaje: 'mensaje', servicio: '' },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
      this.obj.servicio = ''
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
      this.obj.servicio = ''
      this.trigger(this.obj)
    })
  },
  addServicio: function(data){ 
  	socket.emit('addServicio', data)
  	socket.on('okAddServicio', (okAddServicio) =>{
      this.obj.mensaje = okAddServicio
  		this.trigger(this.obj)
  	})
  },
  updateServicio: function(data){
    socket.emit('updateServicio', data)
    socket.on('okUpdateServicio', (okUpdateServicio) =>{
      browserHistory.push('/home')
    })
  },
  searchServicio: function(data){
  	socket.emit('searchServicio', data)
  	socket.on('okSearchServicio', (okSearchServicio) =>{
      this.obj.servicio = okSearchServicio
      this.trigger(this.obj)
  	})
  }
})

export default ServicioStore