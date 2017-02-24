import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import CuadroRochaIndex from '../components/cuadro-rocha'

import CuadroRochaStore from '../stores/CuadroRochaStore'

import CuadroRochaActions from '../actions/CuadroRochaActions'

@ReactMixin.decorate(Reflux.connect(CuadroRochaStore, 'obj'))
export default class CuadroRochaRoutes extends Component {

  constructor() {
    super()
  }


  render() {
      return (
        <CuadroRochaIndex 
        	obj={this.state.obj}
        />       
      )
  }

}


