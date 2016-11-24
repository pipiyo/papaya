import Reflux from 'reflux'
import AutocompleteActions from '../actions/AutocompleteActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}autocomplete` )

let AutocompleteStore = Reflux.createStore({
  listenables: [AutocompleteActions],
  obj: { valores: ''},
  getInitialState: function() {
    return this.obj
  },
  autocomplete: function(data){
  	socket.emit('autocomplete',data)
  	socket.on('okAutocomplete', (okAutocomplete) =>{
  		this.obj.valores = okAutocomplete
  	 	this.trigger(this.obj)
  	 })
  }
})

export default AutocompleteStore