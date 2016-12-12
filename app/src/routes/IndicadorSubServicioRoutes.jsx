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
  	IndicadorSubServicioActions.renderSubServicio(this.props.params.area)
  }
  componentWillReceiveProps(nextProps, nextState){
    IndicadorSubServicioActions.renderSubServicio(nextProps.params.area)
  }
  renderFiltro(){
    IndicadorSubServicioActions.renderFiltro()
  }
  renderFiltroFi(date){
    IndicadorSubServicioActions.renderFiltroFi(date)
  }
  renderFiltroFe(date){
    IndicadorSubServicioActions.renderFiltroFe(date)
  }
  render() {
  	if(this.state.obj.subServicio){
    	return (
        	<IndicadorSubServicio
          area={this.props.params.area} 
          ejecutivo={this.state.obj.ejecutivo}
        	datos={this.state.obj.subServicio}
          filtro={this.state.obj.filtro}
          renderFiltro={this.renderFiltro.bind(this)}
          renderFiltroFi={this.renderFiltroFi.bind(this)}
          renderFiltroFe={this.renderFiltroFe.bind(this)}
        	/>       
      	)
    }else{
    	return (
    		<div><h1>Cargando</h1></div>
    	)
    }
  }

}
