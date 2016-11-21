import Reflux from 'reflux'
import InformeActions from '../actions/InformeActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let InformeStore = Reflux.createStore({
  listenables: [InformeActions],
  viewInformes: function(data,cant,estado,codigo,vendedor,categoria,fechai,cliente,fechae){
  	socket.emit('viewInformes', data,cant,estado,codigo,vendedor,categoria,fechai,cliente,fechae)
  	socket.on('okViewInformes', (okViewInformes) =>{
  		console.log( okViewInformes )
  		this.trigger(okViewInformes)
  	})
  }
})

export default InformeStore