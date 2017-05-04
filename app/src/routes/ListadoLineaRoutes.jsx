import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoLineaActions from '../actions/ListadoLineaActions'
import ListadoLineaStore from '../stores/ListadoLineaStore'

import LitsadoLineaIndex from '../components/listado-linea'

@ReactMixin.decorate(Reflux.connect(ListadoLineaStore, 'obj'))
export default class ListadoLineaRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoLineaActions.renderReset()
    ListadoLineaActions.renderLinea()
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoLineaActions.renderFiltro()
  }
  renderViewMore(){
    ListadoLineaActions.renderViewMore()
  }
  render() {
    if(this.state.obj) {
      return (
        <LitsadoLineaIndex 
        obj={this.state.obj}
        scrollWin={this.props.scrollWin}
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


