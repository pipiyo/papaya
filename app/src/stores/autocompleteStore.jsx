import Reflux from 'reflux'
import autocompleteActions from '../actions/autocompleteActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}rocha` )

let AutocompleteStore = Reflux.createStore({
  listenables: [autocompleteActions],
  obj: { filtro: ''},
  getInitialState: function() {
    return this.obj
  },
  autocomplete: function(data){
  	socket.emit('allRocha',data)
  	socket.on('okAllRocha', (okAllRocha) =>{
  		this.obj.filtro = okAllRocha
  		this.trigger(this.obj)
  	})
  }
})

export default AutocompleteStore