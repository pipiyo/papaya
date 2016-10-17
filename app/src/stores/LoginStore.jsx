import Reflux from 'reflux'
import { hashHistory } from 'react-router'
import getUrl from '../Config'
import io from 'socket.io-client'
import LoginActions from '../actions/LoginActions'

let LoginStore = Reflux.createStore({
  listenables: [LoginActions],
  check: true,
  init: function() {
    this.socket = io( getUrl );
    this.socket.on('login', (data) => {
      if (data) {
        hashHistory.push('home')
      } else {
        this.trigger(this.check)
      }
    })
  },
  checkUser: function (user) {
  this.socket.emit('login', user)
  }
})

export default LoginStore