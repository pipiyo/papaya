import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}login` )
import LoginActions from '../actions/LoginActions'

//import AuthStore from '../stores/AuthStore'

let LoginStore = Reflux.createStore({
  listenables: [LoginActions],
  check: false,
  jwtsecret: false,
  login: function (user) {

  socket.emit('login', user, (token) =>{

    if (token) {
      this.storeUser( token )
    } else {
      this.trigger( this.check )
    }

  })
  },
  storeUser: function (token) {
    localStorage.setItem('name', token.name)
    localStorage.setItem('type', token.type)
    localStorage.setItem('token', token.token)
    localStorage.setItem('full_name', token.full_name)
    localStorage.setItem('profile_picture', token.profile_picture)
    browserHistory.push('home')
  },
  checkUser: function () {
/*
  if (!localStorage.getItem('token')) {
              localStorage.removeItem('name')
              localStorage.removeItem('type')
              localStorage.removeItem('token')
              localStorage.removeItem('full_name')
              localStorage.removeItem('profile_picture')
            browserHistory.push('/')
  }
*/

        socket.emit('checkUser', localStorage.getItem('token') , (request) => {

          if (!request) {
              localStorage.removeItem('name')
              localStorage.removeItem('type')
              localStorage.removeItem('token')
              localStorage.removeItem('full_name')
              localStorage.removeItem('profile_picture')
              browserHistory.push('/')
          }
          
        })

  },
  checkToken: function(){



        socket.emit('checkToken', localStorage.getItem('token') , (request) => {

          if (request) {

              browserHistory.push('/home')
          }
          
        })






  }
})

export default LoginStore