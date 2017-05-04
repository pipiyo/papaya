import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoVehiculoActions from '../actions/ListadoVehiculoActions'
import ListadoVehiculoStore from '../stores/ListadoVehiculoStore'

import LitsadoVehiculoIndex from '../components/listado-vehiculo'

@ReactMixin.decorate(Reflux.connect(ListadoVehiculoStore, 'obj'))
export default class ListadoVehiculoRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoVehiculoActions.renderReset()
    ListadoVehiculoActions.renderVehiculo()
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoVehiculoActions.renderFiltro()
  }
  renderViewMore(){
    ListadoVehiculoActions.renderViewMore()
  }
  render() {
    if(this.state.obj) {
      return (
        <LitsadoVehiculoIndex 
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


