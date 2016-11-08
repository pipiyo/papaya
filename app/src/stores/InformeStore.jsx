import Reflux from 'reflux'
import InformeActions from '../actions/InformeActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let InformeStore = Reflux.createStore({
  listenables: [InformeActions],
  viewInformes: function(data,cant,estado,codigo, vendedor,categoria,fecha){
  	socket.emit('informe', data,cant,estado,codigo,vendedor,categoria,fecha)
  	socket.on('item', (item) =>{
  		this.trigger(item)
  	})
  }
})

export default InformeStore