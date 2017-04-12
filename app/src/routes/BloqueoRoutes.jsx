import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import BloqueoIndex from '../components/bloqueo'

import BloqueoStore from '../stores/BloqueoStore'

@ReactMixin.decorate(Reflux.connect(BloqueoStore, 'obj'))
class BloqueoRoutes extends Component {

  constructor() {
    super()
  }


  render() {
      return (
          <BloqueoIndex />       
      )
  }

}

export default BloqueoRoutes

