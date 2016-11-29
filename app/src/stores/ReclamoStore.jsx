import Reflux from 'reflux'
import moment  from 'moment'
import ReclamoActions from '../actions/ReclamoActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}reclamo` )

let ReclamoStore = Reflux.createStore({
  listenables: [ReclamoActions],
  obj: { 
  	mensaje :"",
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment() } },
    area: null
  },
  getInitialState: function() {
    return this.obj
  },
  renderFechaInicio: function(fecha){
    this.obj.item.fecha.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.item.fecha.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  addReclamo: function(ev){
  	let reclamo = {
		  "reclamo": ev.target.elements['reclamo'].value,
		  "area": ev.target.elements['area'].value,
		  "area1": ev.target.elements['area1'].value,
		  "rocha": ev.target.elements['rocha'].value,
		  "razon": ev.target.elements['razon'].value,
		  "fechaInicio": ev.target.elements['fechaInicio'].value,
		  "fechaEntrega": ev.target.elements['fechaEntrega'].value,
		  "dias": ev.target.elements['dias'].value,
		  "descripcion": ev.target.elements['descripcion'].value,              
		}
  	socket.emit('reclamo', reclamo)
  	socket.on('mensaje', (mensaje) =>{
  		this.obj.mensaje = mensaje
  		if(ev.target.elements['area']){ev.target.elements['area'].options[0].selected = "selected"}
		if(ev.target.elements['area1']){ev.target.elements['area1'].options[0].selected = "selected"}
	    if(ev.target.elements['razon']){ev.target.elements['razon'].options[0].selected = "selected"}
	    if(ev.target.elements['fechaInicio']){ev.target.elements['fechaInicio'].value = ""}
	    if(ev.target.elements['fechaEntrega']){ev.target.elements['fechaEntrega'].value = ""}
	    if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
	    if(ev.target.elements['rocha']){ev.target.elements['rocha'].value = ""}
	    if(ev.target.elements['dias']){ev.target.elements['dias'].value = ""}
	    if(ev.target.elements['reclamo']){ev.target.elements['reclamo'].value = ""}
  		this.trigger(this.obj)
  	})
  	
  }
})

export default ReclamoStore