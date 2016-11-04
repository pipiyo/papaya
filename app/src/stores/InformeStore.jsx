import Reflux from 'reflux'
import { hashHistory } from 'react-router'
import InformeActions from '../actions/InformeActions'
import getUrl from '../Config'
import io from 'socket.io-client'

let InformeStore = Reflux.createStore({
  listenables: [InformeActions],
  viewInformes: function(data,cant){
  	this.socket = io( getUrl )
  	this.socket.emit('informe', data, cant)
  	this.socket.on('item', (item) =>{
  		this.trigger(item)
  	})
  }
})

export default InformeStore