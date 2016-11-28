import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Home from '../components/home'


import HomeStore from '../stores/HomeStore'


@ReactMixin.decorate(Reflux.connect(HomeStore, 'obj'))
export default class HomeRoutes extends React.Component {

  render() {
      return (
            <Home obj={this.state.obj} content={this.props.children}/>
      )

  }

}