import Reflux from 'reflux'
import ServicioActions from '../actions/ServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  addServicio: function(data){
  	socket.emit('servicio', data)
  	socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ServicioStore