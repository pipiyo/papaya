import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import NotificacionIndex from '../components/notificacion'

import NotificationStore from '../stores/NotificationStore'

@ReactMixin.decorate(Reflux.connect(NotificationStore, 'obj'))
export default class NotificacionRoutes extends Component {

  constructor() {
    super()
  }

  render() {
      return (
        <NotificacionIndex obj={this.state.obj} />       
      )
  }

}
