import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import IndicadorServicioActions from '../actions/IndicadorServicioActions'
import IndicadorServicioStore from '../stores/IndicadorServicioStore'

import IndicadorServicio from '../components/indicador-servicio'

@ReactMixin.decorate(Reflux.connect(IndicadorServicioStore, 'obj'))
export default class IndicadorSubServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    IndicadorServicioActions.renderResetMount()
  	IndicadorServicioActions.renderServicio(this.props.params.area)
  }
  componentWillReceiveProps(nextProps, nextState){
    IndicadorServicioActions.renderReset(nextProps.params.area)
    IndicadorServicioActions.renderServicio()
  }
  renderFiltro(event){
    event.preventDefault()
    IndicadorServicioActions.renderFiltro()
  }
  renderFiltroFi(date){
    IndicadorServicioActions.renderFiltroFi(date)
  }
  renderFiltroFe(date){
    IndicadorServicioActions.renderFiltroFe(date)
  }
  renderViewMore(){
    IndicadorServicioActions.renderViewMore()
  }
  render() {
  	if(this.state.obj){
    	return (
        	<IndicadorServicio
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
