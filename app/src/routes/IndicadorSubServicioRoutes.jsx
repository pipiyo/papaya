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
    IndicadorSubServicioActions.renderResetMount()
  	IndicadorSubServicioActions.renderSubServicio(this.props.params.area)
  }
  componentWillReceiveProps(nextProps, nextState){
    if(nextProps.params.area !== this.props.params.area){
      IndicadorSubServicioActions.renderReset()
      IndicadorSubServicioActions.renderSubServicio(nextProps.params.area)
    }
  }
  renderFiltro(event){
    event.preventDefault()
    IndicadorSubServicioActions.renderFiltro()
  }
  renderFiltroFi(date){
    IndicadorSubServicioActions.renderFiltroFi(date)
  }
  renderFiltroFe(date){
    IndicadorSubServicioActions.renderFiltroFe(date)
  }
  renderViewMore(){
    IndicadorSubServicioActions.renderViewMore()
  }
  render() {
  	if(this.state.obj){
    	return (
        	<IndicadorSubServicio
          area={this.props.params.area} 
          total={this.state.obj.total}
          ejecutivo={this.state.obj.ejecutivo}
        	datos={this.state.obj.renderItem}
          filtro={this.state.obj.filtro}
          renderFiltro={this.renderFiltro.bind(this)}
          renderFiltroFi={this.renderFiltroFi.bind(this)}
          renderFiltroFe={this.renderFiltroFe.bind(this)}
          renderViewMore={this.renderViewMore.bind(this)}
        	/>       
      	)
    }else{
    	return (
    		<div><h1>Cargando</h1></div>
    	)
    }
  }

}
