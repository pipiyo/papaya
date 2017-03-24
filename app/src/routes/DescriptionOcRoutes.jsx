import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DescriptionOcActions from '../actions/DescriptionOcActions'
import DescriptionOcStore from '../stores/DescriptionOcStore'

import DescriptionOcIndex from '../components/description-oc'

@ReactMixin.decorate(Reflux.connect(DescriptionOcStore, 'obj'))
export default class DescriptionRochaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
  	DescriptionOcActions.searchOc(this.props.params.id)
  }
  render() {
  	if(this.state.obj){
      return (
         <DescriptionOcIndex 
         scrollWin={this.props.scrollWin}
         obj={this.state.obj}
        />       
      )
  	}else{
  		return (
         <h1>Cargando ...</h1>     
      )

  	}
  }

}


