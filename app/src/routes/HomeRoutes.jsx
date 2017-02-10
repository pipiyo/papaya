import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import HomeActions from '../actions/HomeActions'

import Home from '../components/home'

import HomeStore from '../stores/HomeStore'

@ReactMixin.decorate(Reflux.connect(HomeStore, 'obj'))
export default class HomeRoutes extends Component {

  constructor() {
    super()
  }

  componentWillMount(){

  	HomeActions.getContent()

  }

  render() {

      return (
            <Home content={this.props.children} obj={this.state.obj} />
      )

  }

}