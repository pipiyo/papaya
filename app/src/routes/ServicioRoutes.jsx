import $ from 'jquery'
import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioIndex from '../components/servicio/index'

import ServicioActions from '../actions/LoginActions'

import ServicioStore from '../stores/ServicioStore'

@ReactMixin.decorate(Reflux.connect(ServicioStore, 'check'))
export default class ServicioRoutes extends React.Component {

  constructor() {
    super()
    this.state = { user: true } 
  }

  userFormSubmit() {

  }

  render() {
      return (
            <ServicioIndex />
      )
  }

}