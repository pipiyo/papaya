import Reflux from 'reflux'
import AutocompleteActions from '../actions/AutocompleteActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}autocomplete` )

let AutocompleteStore = Reflux.createStore({
  listenables: [AutocompleteActions],
  obj: { 
    valores: [],
    input: null
  },
  getInitialState: function() {
    return this.obj
  },
  autocomplete: function(ev){
    let data = {
      complete:ev.target.dataset.complete,
      valor: ev.target.value
    }
    
    if(ev.target.value.length){
    	socket.emit('autocomplete',data,(n) => {
        this.obj.valores = n.datos
        this.obj.input = ev.target.id
        this.trigger(this.obj)
      }) 
    }else{
      this.obj.valores = []
      this.obj.input = null
      this.trigger(this.obj)
    }

  },
  autocompleteOK: function(ev,id,datos1,datos2,datos3,datos4,datos5,datos6,datosCantidad){
    document.getElementById(id).value = ev.target.text
    if(datos1){document.getElementById(datos1).value = ev.target.dataset.datos1}
    if(datos2){document.getElementById(datos2).value = ev.target.dataset.datos2}
    if(datos3){document.getElementById(datos3).value = ev.target.dataset.datos3} 
    if(datos4){document.getElementById(datos4).value = ev.target.dataset.datos4}
    if(datos5){document.getElementById(datos5).value = ev.target.dataset.datos5}
    if(datos6){document.getElementById(datos6).value = ev.target.dataset.datos6}
    if(datosCantidad){document.getElementById(datosCantidad).value = ev.target.dataset.cantidad}      
    this.obj.valores = []
    this.obj.input = null
    this.trigger(this.obj)
  },
  autocompleteOff: function(ev){
    setTimeout(this.clear, 100)
  },
  clear: function(ev){
    this.obj.valores = []
    this.obj.input = null
    this.trigger(this.obj)
  }
})

export default AutocompleteStore