import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import getUrl from '../Config'
import io from 'socket.io-client'
const socket = io( getUrl )
import LoginActions from '../actions/LoginActions'

//import AuthStore from '../stores/AuthStore'

let LoginStore = Reflux.createStore({
  listenables: [LoginActions],
  check: false,
  jwtsecret: false,
  login: function (user) {

  socket.emit('login', user, (token) =>{

    if (token) {
      console.log( token )
      this.storeUser( token )
      browserHistory.push('home')
    } else {
      this.trigger( this.check )
    }

  })
  },
  storeUser: function (token) {
    localStorage.setItem('name', token.name)
    localStorage.setItem('type', token.type)
    localStorage.setItem('on', token.on)
    this.trigger( token )
  },
  checkUser: function () {

        socket.emit('checkUser', localStorage.getItem('on') , (name, type, on) => {
          if (name) {

              localStorage.setItem('name', name)
              localStorage.setItem('type', type)
              localStorage.setItem('on', on)

          } else {
              localStorage.removeItem('name')
              localStorage.removeItem('type')
              localStorage.removeItem('on')
            browserHistory.push('/')
          }
        })

  }
})

export default LoginStore