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
    console.log("Hola");
  }
})

export default SubServicioStore