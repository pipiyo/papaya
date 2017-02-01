import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DescriptionRochaActions from '../actions/DescriptionRochaActions'
import DescriptionRochaStore from '../stores/DescriptionRochaStore'

import DescriptionRochaIndex from '../components/description-rocha'

@ReactMixin.decorate(Reflux.connect(DescriptionRochaStore, 'obj'))
export default class DescriptionRochaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
  	DescriptionRochaActions.renderRocha(this.props.params.id)
  }
  renderFilter(event){
  	event.preventDefault()
    DescriptionRochaActions.renderFilter(this.props.params.id)
  }
  render() {
  	if(this.state.obj){
      return (
        <DescriptionRochaIndex 
        renderFilter={this.renderFilter.bind(this)} 
        obj={this.state.obj}  
        />       
      )
  	}else{
  	  return (
        <h1>Cargando</h1>       
      )
  	}
  }

}


