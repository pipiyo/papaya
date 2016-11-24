import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Autocomplete from '../components/autocomplete'

import AutocompleteActions from '../actions/AutocompleteActions'
import AutocompleteStore from '../stores/AutocompleteStore'

@ReactMixin.decorate(Reflux.connect(AutocompleteStore, 'obj'))
export default class AutoCompleteRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
  	AutocompleteActions.autocomplete(this.props.autocomplete)
  }

  componentWillReceiveProps(nextProps, nextState){
    AutocompleteActions.autocomplete(nextProps.autocomplete)
  }

  render() {
    if(this.state.obj){
      return (
        <Autocomplete valor={this.state.obj.valores.datos} />       
      )
    }else{
      return (
        <div><h1>Cargando</h1></div> 
      )
    }
  }

}
