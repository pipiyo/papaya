import Reflux from 'reflux'
import ServicioActions from '../actions/SubServicioActions'

let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  formArea: function (data) {
  	let mensaje = `${data}`
    this.trigger(mensaje)
  }
})

export default ServicioStore