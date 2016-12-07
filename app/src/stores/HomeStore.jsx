import Reflux from 'reflux'
import HomeActions from '../actions/HomeActions'

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],
  getInitialState: function() {
    return this.x = { full_name: localStorage.getItem('full_name'),
                      profile_picture: localStorage.getItem('profile_picture') }
  }
})

export default HomeStore