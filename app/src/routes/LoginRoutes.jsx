import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import LoginFrom from '../components/login/Login'

import LoginActions from '../actions/LoginActions'

import LoginStore from '../stores/LoginStore'

@ReactMixin.decorate(Reflux.connect(LoginStore, 'check'))
export default class LoginRoutes extends React.Component {

  constructor() {
    super()
  }
/*
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = '/home'

    console.log(path)
  }
*/
//this.setState({user: false})


  componentWillMount(){
    LoginActions.checkToken()
  }


  userFormSubmit(ev) {
    ev.preventDefault()
    let user = {
      "userName": ev.target.elements[0].value,
      "pass": ev.target.elements[1].value     
    }
    LoginActions.login(user)

  }

  render() {
      return (
            <div>
              <h1>Login</h1>
              <LoginFrom onSubmit={ this.userFormSubmit.bind(this) } />
            </div>
      )
  }

}