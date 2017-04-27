import Reflux from 'reflux'
import moment  from 'moment'
import ReclamoActions from '../actions/ReclamoActions'
import Env from '../Config'
import io from 'socket.io-client'
import DialogActions from '../actions/DialogActions'
const socket = io.connect( `${Env.url}reclamo` )

let ReclamoStore = Reflux.createStore({
  listenables: [ReclamoActions],
  obj: { 
  	mensaje: {title:"",texto:"",estado:false},
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
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  addReclamo: function(ev){
  	let reclamo = {
		  "area": ev.target.elements['area'].value,
		  "area1": ev.target.elements['area1'].value,
		  "rocha": ev.target.elements['rocha'].value,
		  "razon": ev.target.elements['razon'].value,
		  "fechaInicio": ev.target.elements['fechaInicio'].value,
		  "fechaEntrega": ev.target.elements['fechaEntrega'].value,           
		}
  	socket.emit('reclamo', reclamo)
  	socket.on('mensaje', (mensaje) =>{
  		/* Dialog */
      this.obj.mensaje.texto = mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
  		if(ev.target.elements['area']){ev.target.elements['area'].options[0].selected = "selected"}
		  if(ev.target.elements['area1']){ev.target.elements['area1'].options[0].selected = "selected"}
	    if(ev.target.elements['razon']){ev.target.elements['razon'].options[0].selected = "selected"}
	    if(ev.target.elements['fechaInicio']){ev.target.elements['fechaInicio'].value = ""}
	    if(ev.target.elements['fechaEntrega']){ev.target.elements['fechaEntrega'].value = ""}
	    if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
	    if(ev.target.elements['rocha']){ev.target.elements['rocha'].value = ""}
  		this.trigger(this.obj)
  	})
  	
  }
})

export default ReclamoStore