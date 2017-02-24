import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'
import Env from '../Config'
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
            <div class="module-login">
              <div class="fondo1"></div>
              <div class="fondo2"></div>
              <div class="fondo-gris"></div>
              <div class="item-login">
                <div class="box-login">
                  <div class="img">
                    <div class="img-1">
                      <div class="img-a"><img src={`${Env.url}css/images/fondos/logo2.png`} alt="img" /></div>
                      <div class="img-b"><img src={`${Env.url}css/images/fondos/logo4.png`} alt="img" /></div>
                    </div>
                    <div class="img-2">
                      <div class="img-a"><img src={`${Env.url}css/images/fondos/logo3.png`} alt="img" /></div>
                      <div class="img-b"><img src={`${Env.url}css/images/fondos/logo1.png`} alt="img" /></div>
                    </div>
                    <img src={`${Env.url}css/images/fondos/login-a.jpg`} alt="img" />
                  </div>
                  <div class="box">
                    <h1>Te damos la bienvenida a Papaya, el sistema de gestión.</h1>
                    <LoginFrom onSubmit={ this.userFormSubmit.bind(this) } />
                    <img src={`${Env.url}css/images/logos/logo.png`} alt="img" />
                  </div>
                </div>
              </div>
            </div>
      )
  }

}