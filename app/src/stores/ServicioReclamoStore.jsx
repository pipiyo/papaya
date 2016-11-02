import Reflux from 'reflux'
import { hashHistory } from 'react-router'
import ServicioReclamoActions from '../actions/ServicioReclamoActions'
import getUrl from '../Config'
import io from 'socket.io-client'

let ServicioReclamoStore = Reflux.createStore({
  listenables: [ServicioReclamoActions],
  addServicio: function(data){
  	this.socket = io( getUrl )
  	this.socket.emit('servicio', data)
  	this.socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ServicioReclamoStore