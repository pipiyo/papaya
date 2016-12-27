import Reflux from 'reflux'

let HomeActions = Reflux.createActions([
  '_showNotification',
  'hideNotification',
  '_showUserNav',
  'hideUserNav',
  'logout'
])

export default HomeActions