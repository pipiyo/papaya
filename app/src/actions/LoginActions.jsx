import Reflux from 'reflux'

let LoginActions = Reflux.createActions([
  'login',
  'checkUser',
  'checkToken'
])

export default LoginActions