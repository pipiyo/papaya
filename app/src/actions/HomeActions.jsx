import Reflux from 'reflux'

let HomeActions = Reflux.createActions([
  '_showNotification',
  'hideNotification',
  '_showUserNav',
  'hideUserNav',
  'logout',
  'getContent'
])

export default HomeActions