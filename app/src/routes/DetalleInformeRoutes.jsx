import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import SubServicioActions from '../actions/SubServicioActions'
import SubServicioStore from '../stores/SubServicioStore'

import DetalleInforme from '../components/detalle-informe'

@ReactMixin.decorate(Reflux.connect(SubServicioStore, 'data'))
export default class DetalleInformeRoutes extends React.Component {

  constructor() {
    super()
  }

  componentWillMount(){
  	SubServicioActions.subServicio(this.props.params.id);
  }

  render() {
    if(this.state.data){  
      return (
        <DetalleInforme datos={this.state.data} />       
      )
    }else{
      return (
        <div><h1>Cargando</h1></div>      
      )
    }
  }

}
