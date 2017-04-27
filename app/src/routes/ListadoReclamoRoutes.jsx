import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ListadoReclamoActions from '../actions/ListadoReclamoActions'
import ListadoReclamoStore from '../stores/ListadoReclamoStore'

import LitsadoReclamoIndex from '../components/listado-reclamo'

@ReactMixin.decorate(Reflux.connect(ListadoReclamoStore, 'obj'))
export default class ListadoReclamoRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
    ListadoReclamoActions.renderReset()
    ListadoReclamoActions.renderReclamo()
  }
  renderFiltro(event){
    event.preventDefault()
    ListadoReclamoActions.renderFiltro()
  }
  renderViewMore(){
    ListadoReclamoActions.renderViewMore()
  }
  render() {
    if(this.state.obj) {
      return (
        <LitsadoReclamoIndex 
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


