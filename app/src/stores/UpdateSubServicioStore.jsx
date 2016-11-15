import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateSubServicioActions from '../actions/UpdateSubServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let UpdateSubServicioStore = Reflux.createStore({
  listenables: [UpdateSubServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', search: ''},
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.search = ''
    })
  },
  getInitialState: function() {
    return this.obj
  },
  formTrigger: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.search = ''
      this.trigger(this.obj)
    })
  },
  updateSubServicio: function(data,ruta){
    socket.emit('updateSubServicio', data)
    socket.on('okUpdateSubServicio', (okUpdateSubServicio) =>{
      browserHistory.push(ruta)
    })
  },
  searchSubServicio: function(data){
    socket.emit('searchSubServicio', data)
    socket.on('okSearchSubServicio', (okSearchSubServicio) =>{
      this.obj.search = okSearchSubServicio
      this.trigger(this.obj)
    })
  },
  
})

export default UpdateSubServicioStore