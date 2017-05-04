import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import CuadroRochaComercialIndex from '../components/cuadro-rocha-comercial'

import CuadroRochaComercialStore from '../stores/CuadroRochaComercialStore'

@ReactMixin.decorate(Reflux.connect(CuadroRochaComercialStore, 'obj'))
class CuadroRochaComercialRoutes extends Component {

  constructor() {
    super()
  }


  render() {
      return (
          <CuadroRochaComercialIndex obj={this.state.obj} scrollWin={this.props.scrollWin} />       
      )
  }

}

export default CuadroRochaComercialRoutes

