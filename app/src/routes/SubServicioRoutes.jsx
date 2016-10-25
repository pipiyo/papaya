import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioIndex from '../components/sub-servicio'
import ServicioStore from '../stores/SubServicioStore'
import ServicioActions from '../actions/SubServicioActions'

@ReactMixin.decorate(Reflux.connect(ServicioStore, 'data'))
export default class ServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  formArea(value) {
    ServicioActions.formArea(value.target.value)
  }

  render() {
      return (
        <ServicioIndex area={this.state.data} formArea = {this.formArea.bind(this)} />       
      )
  }

}

