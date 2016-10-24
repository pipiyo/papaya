import Reflux from 'reflux'
import { hashHistory } from 'react-router'
import getUrl from '../Config'
import io from 'socket.io-client'
import HomeActions from '../actions/HomeActions'

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],
  checkLogin: function () {
    this.socket = io( getUrl )
    this.socket.on('checklogin', (data) => {
      if (!data) {
        hashHistory.push('/')
      }
    })
    this.socket.emit('checklogin')
  }
})

export default HomeStore