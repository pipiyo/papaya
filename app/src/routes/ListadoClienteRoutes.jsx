import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoClienteActions from '../actions/ListadoClienteActions'
import ListadoClienteStore from '../stores/ListadoClienteStore'

import LitsadoClienteIndex from '../components/listado-cliente'

@ReactMixin.decorate(Reflux.connect(ListadoClienteStore, 'obj'))
export default class ListadoClienteRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoClienteActions.renderReset()
    ListadoClienteActions.renderCliente()
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoClienteActions.renderFiltro()
  }
  renderViewMore(){
    ListadoClienteActions.renderViewMore()
  }
  render() {
    if(this.state.obj) {
      return (
        <LitsadoClienteIndex 
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


