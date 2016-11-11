import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import SubServicioActions from '../actions/SubServicioActions'
import SubServicioStore from '../stores/SubServicioStore'
import ServicioIndex from '../components/sub-servicio'

@ReactMixin.decorate(Reflux.connect(SubServicioStore, 'data'))
export default class SubServicioRoutes extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <ServicioIndex />       
      )
  }

}


