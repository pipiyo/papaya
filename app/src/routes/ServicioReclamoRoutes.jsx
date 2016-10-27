import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioReclamoStore from '../stores/ServicioReclamoStore'
import ServicioReclamoActions from '../actions/ServicioReclamoActions'
import ServicioIndex from '../components/reclamo/servicio-reclamo'

@ReactMixin.decorate(Reflux.connect(ServicioReclamoStore, 'data'))
export default class ServicioReclamoRoutes extends React.Component {

  constructor() {
    super()
  }

  formArea(value) {
    ServicioReclamoActions.formArea(value.target.value)
  }

  render() {
      return (
        <ServicioIndex area={this.state.data} formArea = {this.formArea.bind(this)} />       
      )
  }

}
