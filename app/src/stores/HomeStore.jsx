import Reflux from 'reflux'
import HomeActions from '../actions/HomeActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}notification` )

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],

  obj: { notification: null },

  init: function() {

    this.getObj()

  },
  getObj: function(){
    socket.emit('notification', (doc) => {
      this.obj.notification = doc 
    })
  },
  getInitialState: function() {

    return this.obj

  }
})

export default HomeStore