import Reflux from 'reflux'
import ServicioActions from '../actions/ServicioActions'

import FormIngresoServicioStore from '../stores/FormIngresoServicioStore'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  obj: { comunas: null, vehiculos: null, mensaje: null },
  init: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
    })
  },
  addServicio: function(data){
  	socket.emit('servicio', data)
  	socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ServicioStore