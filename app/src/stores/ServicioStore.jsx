import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import ServicioActions from '../actions/ServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  getInitialState: function() {

  },
  addServicio: function(data){
  	socket.emit('servicio', data)
  	socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  },
  updateServicio: function(data){
    socket.emit('servicioUpdate', data)
    socket.on('update', (update) =>{
      browserHistory.push('/home')
    })
  },
  servicio: function(data){
  	socket.emit('servicioListar', data)
  	socket.on('items', (items) =>{
  		this.trigger(items)
  	})
  }
})

export default ServicioStore