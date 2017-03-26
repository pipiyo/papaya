import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ValeEmisionIndex from '../components/vale-emision'

import ValeEmisionActions from '../actions/ValeEmisionActions'
import ValeEmisionStore from '../stores/ValeEmisionStore'

import AutocompleteActions from '../actions/AutocompleteActions'

@ReactMixin.decorate(Reflux.connect(ValeEmisionStore, 'obj'))
export default class ValeEmisionRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    ValeEmisionActions.completSelect()
  }
  renderFechaInicio(date){
    ValeEmisionActions.renderFechaInicio(date)
  }
  addVale(ev){
    ev.preventDefault()
    ev.persist()
    ValeEmisionActions.addVale(ev)
  }
  renderFechaEntrega(date){
    ValeEmisionActions.renderFechaEntrega(date)
  }
  addRowVale(ev){
    ev.preventDefault()
    ValeEmisionActions.addRowVale()
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
        <ValeEmisionIndex
          obj={this.state.obj}
        	scrollWin={this.props.scrollWin}
          autocompleteOff={this.autocompleteOff.bind(this)} 
          autocomplete={this.autocomplete.bind(this)} 
          renderFechaInicio={this.renderFechaInicio.bind(this)} 
          renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
          addRowVale={this.addRowVale.bind(this)}
          addVale={this.addVale.bind(this)}
        />       
        )
      }else{
        return (
          <div><h1>Cargando ...</h1></div>  
        )
      } 
  }

}


