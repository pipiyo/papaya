import Reflux from 'reflux'
import InformeRochaActions from '../actions/InformeRochaActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}rocha` )

let InformeRochaStore = Reflux.createStore({
  listenables: [InformeRochaActions],
  obj: { rocha: '', filtro:{estado: "EN PROCESO", fechai: "", fechae: "", vendedor : "", cliente : "",codigo:"",count:100} },
  getInitialState: function() {
    return this.obj
  },
  renderReset: function(){
    this.obj.filtro.fechai = ""
    this.obj.filtro.fechae = ""
    this.obj.filtro.codigo = ""
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = ""
    this.obj.filtro.cliente = "" 
  },
  allRocha: function(data){
  	socket.emit('allRocha',data)
  	socket.on('okAllRocha', (okAllRocha) =>{
  		this.obj.rocha = okAllRocha
  		this.trigger(this.obj)
  	})
  }
})

export default InformeRochaStore