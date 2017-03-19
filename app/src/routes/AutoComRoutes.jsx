import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import IndexAutocomplete from '../components/autocomplete'
import AutocompleteActions from '../actions/AutocompleteActions'
import AutocompleteStore from '../stores/AutocompleteStore'

@ReactMixin.decorate(Reflux.connect(AutocompleteStore, 'obj'))
export default class AutoCompleteRoutes extends React.Component {

  constructor() {
    super()
  }
  autocompleteOK(ev) {
    ev.preventDefault()
    ev.persist()
    AutocompleteActions.autocompleteOK(ev,this.props.name,this.props.datos1,this.props.datos2,this.props.datos3,this.props.datos4,this.props.datos5,this.props.datos6,this.props.datosCantidad);
  }

  render() {
      return (
        <IndexAutocomplete autocompleteOK={this.autocompleteOK.bind(this)} name={this.props.name} obj={this.state.obj} />       
      )
  }

}
