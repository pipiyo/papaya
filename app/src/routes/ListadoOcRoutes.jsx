import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoOcActions from '../actions/ListadoOcActions'
import ListadoOcStore from '../stores/ListadoOcStore'

import LitsadoOcIndex from '../components/listado-oc'

@ReactMixin.decorate(Reflux.connect(ListadoOcStore, 'obj'))
export default class ListadoOcRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoOcActions.renderReset()
    ListadoOcActions.renderOc()
  }
  renderFiltroFi(date){
    ListadoOcActions.renderFiltroFi(date)
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoOcActions.renderFiltro()
  }
  renderFiltroFe(date){
    ListadoOcActions.renderFiltroFe(date)
  }
  renderViewMore(){
    ListadoOcActions.renderViewMore()
  }
  render() {
  	if(this.state.obj) {
      return (
        <LitsadoOcIndex 
        obj={this.state.obj}
        scrollWin={this.props.scrollWin}
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


