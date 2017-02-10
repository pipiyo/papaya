import Reflux from 'reflux'

import AuthActions from '../actions/AuthActions'

let AuthStore = Reflux.createStore({
  listenables: [AuthActions],
  getInitialState: function() {
    return this.state = 'hola'
  },
/*
  init: function () {
    this.socket = io(getUrl)
    this.socket.on('connect', () => {
      this.getUser()
    });
  },
  
  getUser: function () {


this.socket = io(getUrl)

    this.socket = io(getUrl)
    this.socket.emit('getUser', (user) =>{
      console.log( user )
      if (!user) {
        browserHistory.push('/')
      }
    })



  console.log( localStorage.getItem('jwt') )

  this.socket.emit('getUser', localStorage.getItem('jwt'), (token) =>{

      console.log( token )
      this.trigger( token )
    
  })

  
  this.trigger( localStorage.getItem('jwt') )


  }

  */
})
export default AuthStore
/*
class AuthStore {

  constructor() {
    this._name = null
    this._type = null
  }

  save(user) {
    this._name = user.name
    this._type = user.type
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }


  set name(value) {
    this._name = value
  }

  set type(value) {
    this._type = value
  }

  isLoggedIn() {
    return !!this._name;
  }
}

export default new AuthStore()
*/


/*
let promesa = new Promise( (resolve, reject) => {  
   if (1 == 1) {
      resolve('hola')
   } else {
      reject('chau')
   }
})

promesa.
    then( respuesta => console.log( respuesta ) ).
    catch( error => {
        console.error({ err: error }, 'Unexpected Error')
    })
*/