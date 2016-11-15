import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import SubServicioActions from '../actions/SubServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let SubServicioStore = Reflux.createStore({
  listenables: [SubServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', mensaje: '', subServicio: '', search: ''},
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
      this.obj.subServicio = ''
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
      this.obj.mensaje = ''
      this.obj.subServicio = ''
      this.obj.search = ''
      this.trigger(this.obj)
    })
    
  },
  allSubServicio: function(data){
  	socket.emit('allSubServicio', data)
  	socket.on('okAllSubServicio', (okAllSubServicio) =>{
  		this.obj.subServicio = okAllSubServicio
      this.trigger(this.obj)
  	})
  },
  addSubServicio: function(data){
    socket.emit('addSubServicio', data)
    socket.on('okAddSubServicio', (okAddSubServicio) =>{
      this.obj.mensaje = okAddSubServicio
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

export default SubServicioStore