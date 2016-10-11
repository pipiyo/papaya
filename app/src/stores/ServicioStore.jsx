import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import ServicioActions from '../actions/ServicioActions'

let ServicioStore = Reflux.createStore({
  listenables: [ServicioActions],
  ingresarServicio: function (user) {

    
  }
})

export default ServicioStore