import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import SubServicioActions from '../actions/SubServicioActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let SubServicioStore = Reflux.createStore({
  listenables: [SubServicioActions],
  obj: { comunas: 'comunas', vehiculos: 'vehiculos', mensaje: ''},
  init: function() {
    this.getObj()
  },
  getObj: function() {
    socket.emit('formingresoservicio', (comunas, vehiculos) => {
      this.obj.comunas = comunas
      this.obj.vehiculos = vehiculos
      this.obj.mensaje = ''
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
      this.obj.search = ''
      this.trigger(this.obj)
    })
    
  },
  addSubServicio: function(data){
    socket.emit('addSubServicio', data, JSON.stringify( localStorage.getItem('token') ))
    socket.on('okAddSubServicio', (okAddSubServicio) =>{
      this.obj.mensaje = okAddSubServicio
      this.trigger(this.obj)
    })
  }
})

export default SubServicioStore