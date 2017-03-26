import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateOcIndex from '../components/update-oc'

import UpdateOcActions from '../actions/UpdateOcActions'
import UpdateOcStore from '../stores/UpdateOcStore'

import AutocompleteActions from '../actions/AutocompleteActions'

@ReactMixin.decorate(Reflux.connect(UpdateOcStore, 'obj'))
export default class UpdateOcRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateOcActions.completSelect(this.props.params.id)
  }
  renderFechaInicio(date){
    UpdateOcActions.renderFechaInicio(date)
  }
  updateOc(ev){
    ev.preventDefault()
    ev.persist()
    UpdateOcActions.updateOc(ev,this.props.params.id)
  }
  renderFechaEntrega(date){
    UpdateOcActions.renderFechaEntrega(date)
  }
  addSubActividad(){
    UpdateOcActions.addSubActividad()
  }
  addRowOc(ev){
    ev.preventDefault()
    UpdateOcActions.addRowOc()
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
        <UpdateOcIndex
          obj={this.state.obj}
        	scrollWin={this.props.scrollWin}
          autocompleteOff={this.autocompleteOff.bind(this)} 
          autocomplete={this.autocomplete.bind(this)} 
          renderFechaInicio={this.renderFechaInicio.bind(this)} 
          renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
          addSubActividad={this.addSubActividad.bind(this)}
          addRowOc={this.addRowOc.bind(this)}
          updateOc={this.updateOc.bind(this)}
        />       
        )
      }else{
        return (
          <div><h1>Cargando ...</h1></div>  
        )
      } 
  }

}


