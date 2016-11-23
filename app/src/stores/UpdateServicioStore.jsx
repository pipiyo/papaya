import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateServicioActions from '../actions/UpdateServicioActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )



let UpdateServicioStore = Reflux.createStore({
  listenables: [UpdateServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', servicio: '' },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.trigger(this.obj)
    })
  },
  updateServicio: function(data){
    socket.emit('updateServicio', data)
    socket.on('okUpdateServicio', (okUpdateServicio) =>{
      browserHistory.push('/home')
    })
  },
  searchServicio: function(data){
  	socket.emit('searchServicio', data)
  	socket.on('okSearchServicio', (okSearchServicio) =>{
      this.obj.servicio = okSearchServicio
      this.trigger(this.obj)
  	})
  }
})

export default UpdateServicioStore