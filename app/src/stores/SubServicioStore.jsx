import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import SubServicioActions from '../actions/SubServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let SubServicioStore = Reflux.createStore({
  listenables: [SubServicioActions],
  getInitialState: function() {

  },
  subServicio: function(data){
  	socket.emit('servicioListar', data)
  	socket.on('items', (items) =>{
  		this.trigger(items)
  	})
  },
  addSubServicio: function(data){
    socket.emit('addSubServicio', data)
    socket.on('mensaje', (mensaje) =>{
      this.trigger(mensaje)
    })
  },
  subServicioUpdate: function(data){
    socket.emit('servicioListarUnico', data)
    socket.on('datos', (datos) =>{
      this.trigger(datos)
    })
  },
  updateSubServicio: function(data,ruta){
    socket.emit('subServicioUpdate', data)
    socket.on('update', (update) =>{
      browserHistory.push(ruta)
    })
  },
})

export default SubServicioStore