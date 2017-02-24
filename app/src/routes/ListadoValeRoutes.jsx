import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoValeActions from '../actions/ListadoValeActions'
import ListadoValeStore from '../stores/ListadoValeStore'

import LitsadoValeIndex from '../components/listado-vale'

@ReactMixin.decorate(Reflux.connect(ListadoValeStore, 'obj'))
export default class ListadoOcRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoValeActions.renderReset()
    ListadoValeActions.renderVale()
  }
  renderFiltroFi(date){
    ListadoValeActions.renderFiltroFi(date)
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoValeActions.renderFiltro()
  }
  renderFiltroFe(date){
    ListadoValeActions.renderFiltroFe(date)
  }
  renderViewMore(){
    ListadoValeActions.renderViewMore()
  }
  render() {
  	if(this.state.obj) {
      return (
        <LitsadoValeIndex 
        obj={this.state.obj}
        renderFiltroFi={this.renderFiltroFi.bind(this)}
        renderFiltroFe={this.renderFiltroFe.bind(this)}
        renderViewMore={this.renderViewMore.bind(this)}
        renderFiltro={this.renderFiltro.bind(this)}  
        />       
      )
  	}else{
  	  return (
        <h1>Cargando</h1>       
      )
  	}
  }

}


