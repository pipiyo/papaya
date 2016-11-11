import Reflux from 'reflux'
import ReclamoActions from '../actions/ReclamoActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}reclamo` )

let ReclamoStore = Reflux.createStore({
  listenables: [ReclamoActions],
  addReclamo: function(data){
  	socket.emit('reclamo', data)
  	socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ReclamoStore