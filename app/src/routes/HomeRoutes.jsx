import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Home from '../components/home'

import HomeActions from '../actions/HomeActions'

import HomeStore from '../stores/HomeStore'

@ReactMixin.decorate(Reflux.connect(HomeStore, 'var'))
export default class HomeRoutes extends React.Component {

  constructor() {
    super()
    console.log( window.location.hash.substr(0) )
	console.log( window.location.hash.substr(1) )
	console.log( window.location.hash.substr(2) )
  }


  componentWillMount(){
     HomeActions.checkLogin()
  }

  render() {
  	  return (
            <Home content={this.props.children}/>
      )
  }

}