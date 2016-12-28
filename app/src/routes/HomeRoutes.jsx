import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Home from '../components/home'

import HomeStore from '../stores/HomeStore'

@ReactMixin.decorate(Reflux.connect(HomeStore, 'obj'))
export default class HomeRoutes extends React.Component {

  constructor() {
    super()
  }

  render() {

      return (
            <Home content={this.props.children} obj={this.state.obj} />
      )

  }

}