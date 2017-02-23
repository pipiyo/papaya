import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import RecibirValeActions from '../actions/RecibirValeActions'
import RecibirValeStore from '../stores/RecibirValeStore'

import RecibirValeIndex from '../components/recibir-vale'

@ReactMixin.decorate(Reflux.connect(RecibirValeStore, 'obj'))
export default class RecibirOCRoutes extends React.Component {

  constructor() {
  super()
  }

  componentWillMount(){
  	RecibirValeActions.searchVale(this.props.params.id)
  }
  renderInput(event){
    RecibirValeActions.renderInput(event.target.id,event.target.value)
  }
  renderInputOcTotal(event){
    RecibirValeActions.renderInputOcTotal(event.target.id,event.target.value)
  }
  updateVale(event) {
    event.preventDefault()
    event.persist()
    RecibirValeActions.updateVale(event);
  }

  render() {
  	if(this.state.obj){
	    return(
	      <RecibirValeIndex 
	      obj={this.state.obj}
	      renderInput={this.renderInput.bind(this)}
	      renderInputOcTotal={this.renderInputOcTotal.bind(this)}
        updateVale={this.updateVale.bind(this)}
	      />       
	    )
	}else{
		return(
	      <div><h1>Cargando ...</h1> </div>       
	    )
	}
  }

}
