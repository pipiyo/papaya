import Reflux from 'reflux'

let HomeActions = Reflux.createActions([
  '_showNotification',
  'hideNotification',
  '_showUserNav',
  'hideUserNav',
  '_logout',
  'getContent'
])

export default HomeActions