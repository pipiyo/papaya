import Reflux from 'reflux'
import HomeActions from '../actions/HomeActions'

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],
  hola: 'hola',
  init: function() {
    this.trigger( this.hola )
  },
  checkLogin: function() {


   this.trigger( this.hola )

/*
    this.socket = io( getUrl )
    this.socket.on('checklogin', (data) => {
      if (!data) {
        hashHistory.push('/')
      }
    })
    this.socket.emit('checklogin')
    */
  }
})

export default HomeStore