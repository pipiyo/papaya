import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoProveedorActions from '../actions/ListadoProveedorActions'
import ListadoProveedorStore from '../stores/ListadoProveedorStore'

import LitsadoProveedorIndex from '../components/listado-proveedor'

@ReactMixin.decorate(Reflux.connect(ListadoProveedorStore, 'obj'))
export default class ListadoProveedorRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoProveedorActions.renderReset()
    ListadoProveedorActions.renderProveedor()
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoProveedorActions.renderFiltro()
  }
  renderViewMore(){
    ListadoProveedorActions.renderViewMore()
  }
  render() {
    if(this.state.obj) {
      return (
        <LitsadoProveedorIndex 
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


