import React from 'react'

import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import { browserHistory } from 'react-router'

import LoginActions from '../actions/LoginActions'


export default class AuthRoutes extends React.Component {

  constructor() {
    super()
    console.log( 'hola aqui el AUTH' )
  }


  componentWillMount(){
    LoginActions.checkUser()
  }

  componentWillReceiveProps(){

    LoginActions.checkUser()

  }




  render() {
      return this.props.children
  }

}