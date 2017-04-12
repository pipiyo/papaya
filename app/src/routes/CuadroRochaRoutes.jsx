import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import CuadroRochaIndex from '../components/cuadro-rocha'

import CuadroRochaStore from '../stores/CuadroRochaStore'

@ReactMixin.decorate(Reflux.connect(CuadroRochaStore, 'obj'))
class CuadroRochaRoutes extends Component {

  constructor() {
    super()
  }


  render() {
      return (
          <CuadroRochaIndex obj={this.state.obj} scrollWin={this.props.scrollWin} />       
      )
  }

}

export default CuadroRochaRoutes

