import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import IndicadorSubServicioActions from '../actions/IndicadorSubServicioActions'
import IndicadorSubServicioStore from '../stores/IndicadorSubServicioStore'

import IndicadorSubServicio from '../components/indicador-sub-servicio'

@ReactMixin.decorate(Reflux.connect(IndicadorSubServicioStore, 'obj'))
export default class IndicadorSubServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
  	IndicadorSubServicioActions.renderSubServicio()
  }

  render() {
  	if(this.state.obj.subServicio){
    	return (
        	<IndicadorSubServicio 
        	datos={this.state.obj.subServicio}
        	/>       
      	)
    }else{
    	return (
    		<div><h1>Cargando</h1></div>
    	)
    }
  }

}
