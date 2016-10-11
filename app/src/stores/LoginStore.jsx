import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import LoginActions from '../actions/LoginActions'

let LoginStore = Reflux.createStore({
  listenables: [LoginActions],
  check: false,
  checkUser: function (user) {

  	if (user.userName == 'fcb') {
		browserHistory.push('/home')
  	} else {
  		this.check = 'el usuario no es valido'
  		this.trigger(this.check)
  	}
    
  }
})

export default LoginStore