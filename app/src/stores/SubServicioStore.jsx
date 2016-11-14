import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import SubServicioActions from '../actions/SubServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let SubServicioStore = Reflux.createStore({
  listenables: [SubServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', mensaje: '', subServicio: '' },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
      this.obj.subServicio = ''
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
      this.obj.servicio = ''
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
      console.log("Test: "+ okAddSubServicio)
      this.trigger(this.obj)
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