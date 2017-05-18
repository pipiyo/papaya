import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import BloqueoActions from '../actions/BloqueoActions'

import BloqueoIndex from '../components/bloqueo'

import BloqueoStore from '../stores/BloqueoStore'

@ReactMixin.decorate(Reflux.connect(BloqueoStore, 'obj'))
class BloqueoRoutes extends Component {

  constructor() {
    super()
  }

  componentWillMount(){
    BloqueoActions.get()
  }

  render() {

  	if (this.state.obj.loading) {
		return( <h1>Cargando</h1> )
  	} else {
  		return (
          <BloqueoIndex obj={this.state.obj} />       
      )

  	}

  }

}

export default BloqueoRoutes

