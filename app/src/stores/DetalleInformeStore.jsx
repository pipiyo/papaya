import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import DetalleInformeActions from '../actions/DetalleInformeActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let DetalleInformeStore = Reflux.createStore({
  listenables: [DetalleInformeActions],
  obj: { subServicio: null },
  getInitialState: function() {
    return this.obj
  },
  allSubServicio: function(data){
  	socket.emit('allSubServicio', data)
  	socket.on('okAllSubServicio', (okAllSubServicio) =>{
  		this.obj.subServicio = okAllSubServicio
      this.trigger(this.obj)
  	})
  }
  
})

export default DetalleInformeStore