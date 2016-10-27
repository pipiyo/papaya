import Reflux from 'reflux'
import ServicioReclamoActions from '../actions/ServicioReclamoActions'

let ServicioReclamoStore = Reflux.createStore({
  listenables: [ServicioReclamoActions],
  formArea: function (data) {
  	let mensaje = `${data}`
    this.trigger(mensaje)
  }
})

export default ServicioReclamoStore