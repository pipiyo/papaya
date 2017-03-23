import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateValeIndex from '../components/update-vale'

import UpdateValeActions from '../actions/UpdateValeActions'
import UpdateValeStore from '../stores/UpdateValeStore'

import AutocompleteActions from '../actions/AutocompleteActions'

@ReactMixin.decorate(Reflux.connect(UpdateValeStore, 'obj'))
export default class UpdateValeRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateValeActions.completSelect(this.props.params.id)
  }
  renderFechaInicio(date){
    UpdateValeActions.renderFechaInicio(date)
  }
  updateVale(ev){
    ev.preventDefault()
    ev.persist()
    UpdateValeActions.updateVale(ev,this.props.params.id)
  }
  renderFechaEntrega(date){
    UpdateValeActions.renderFechaEntrega(date)
  }
  addRowVale(ev){
    ev.preventDefault()
    UpdateValeActions.addRowVale()
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
        <UpdateValeIndex
          obj={this.state.obj}
          scrollWin={this.props.scrollWin}
          autocompleteOff={this.autocompleteOff.bind(this)} 
          autocomplete={this.autocomplete.bind(this)} 
          renderFechaInicio={this.renderFechaInicio.bind(this)} 
          renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
          addRowVale={this.addRowVale.bind(this)}
          updateVale={this.updateVale.bind(this)}
        />       
        )
      }else{
        return (
          <div><h1>Cargando ...</h1></div>  
        )
      } 
  }

}


