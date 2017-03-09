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
  autocompleteOK: function(ev,id){
    document.getElementById(id).value = ev.target.text
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