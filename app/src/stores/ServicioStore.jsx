import Reflux from 'reflux'
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
      this.obj.mensaje = 'HOLA BLD'
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {

    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = 'HOLA BLD'
      this.trigger(this.obj)
    })
    
  },
  addServicio: function(data){ 
  	socket.emit('servicio', data)
  	socket.on('mensaje', (mensaje) =>{
      this.obj.mensaje = mensaje
  		this.trigger(this.obj)
  	})
  	
  }
})

export default ServicioStore