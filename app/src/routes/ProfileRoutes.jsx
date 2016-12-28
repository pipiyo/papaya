import React, { Component }  from 'react'

import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Profile from '../components/profile'

import ProfileStore from '../stores/ProfileStore'

@ReactMixin.decorate(Reflux.connect(ProfileStore, 'obj'))

export default class ProfileRoutes extends Component {

  constructor() {
    super()
  }

  render() {

      return (
            <Profile obj={this.state.obj} />
      )

  }

}