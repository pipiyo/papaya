import Reflux from 'reflux'
import ServicioActions from '../actions/ServicioActions'
import getUrl from '../Config'
import io from 'socket.io-client'

let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  addServicio: function(data){
  	this.socket = io( getUrl )
  	this.socket.emit('servicio', data)
  	this.socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ServicioStore