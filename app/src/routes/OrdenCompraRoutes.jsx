import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import OrdenCompraIndex from '../components/orden-compra'

import ordenCompraActions from '../actions/ordenCompraActions'
import ordenCompraStore from '../stores/ordenCompraStore'

import AutocompleteActions from '../actions/AutocompleteActions'

@ReactMixin.decorate(Reflux.connect(ordenCompraStore, 'obj'))
export default class OrdenCompraRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    ordenCompraActions.completSelect()
  }
  renderFechaInicio(date){
    ordenCompraActions.renderFechaInicio(date)
  }
  addOc(ev){
    ev.preventDefault()
    ev.persist()
    ordenCompraActions.addOc(ev)
  }
  renderFechaEntrega(date){
    ordenCompraActions.renderFechaEntrega(date)
  }
  addSubActividad(){
    ordenCompraActions.addSubActividad()
  }
  addRowOc(ev){
    ev.preventDefault()
    ordenCompraActions.addRowOc()
  }
  autocomplete(ev){
    ev.persist()
    AutocompleteActions.autocomplete(ev)
  }
  autocompleteOff(ev,input){
    ev.persist()
    AutocompleteActions.autocompleteOff(ev)
  }
  render() {

      if(this.state.obj){
      return (
        <OrdenCompraIndex
          obj={this.state.obj}
        	scrollWin={this.props.scrollWin}
          autocompleteOff={this.autocompleteOff.bind(this)} 
          autocomplete={this.autocomplete.bind(this)} 
          renderFechaInicio={this.renderFechaInicio.bind(this)} 
          renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
          addSubActividad={this.addSubActividad.bind(this)}
          addRowOc={this.addRowOc.bind(this)}
          addOc={this.addOc.bind(this)}
        />       
        )
      }else{
        return (
          <div><h1>Cargando ...</h1></div>  
        )
      } 
  }

}


