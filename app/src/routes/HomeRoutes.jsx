import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import { browserHistory } from 'react-router'

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

  componentWillUpdate(nextp, nexts){

    let check = false

      _.forEach(  nexts.obj.menu, function(value, key) {
          if (nextp.children.props.location.pathname != `/home`) {
              if (_.filter(value.items, function(i) { return i.path == nextp.children.props.location.pathname }).length > 0  ) {
                check = true
                return
              }
          }else{
            check = true
          }
      })

      if (check === false) {
        alert( `Usted no tiene acceso a esta parte >:V` )
        browserHistory.push('/home')
      }


  }


  render() {

      return (
            <Home content={this.props.children} obj={this.state.obj} />
      )

  }

}