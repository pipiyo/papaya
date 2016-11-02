import Reflux from 'reflux'
import { hashHistory } from 'react-router'
import ReclamoActions from '../actions/ReclamoActions'
import getUrl from '../Config'
import io from 'socket.io-client'

let ReclamoStore = Reflux.createStore({
  listenables: [ReclamoActions],
  addReclamo: function(data){
  	this.socket = io( getUrl )
  	this.socket.emit('reclamo', data)
  	this.socket.on('mensaje', (mensaje) =>{
  		this.trigger(mensaje)
  	})
  	
  }
})

export default ReclamoStore