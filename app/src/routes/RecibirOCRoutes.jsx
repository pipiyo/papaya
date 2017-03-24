import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import RecibirOcActions from '../actions/RecibirOcActions'
import RecibirOcStore from '../stores/RecibirOcStore'

import RecibirOcIndex from '../components/recibir-oc'

@ReactMixin.decorate(Reflux.connect(RecibirOcStore, 'obj'))
export default class RecibirOCRoutes extends React.Component {

  constructor() {
  super()
  }

  componentWillMount(){
  	RecibirOcActions.searchOc(this.props.params.id)
  }
  renderInput(event){
    RecibirOcActions.renderInput(event.target.id,event.target.value)
  }
  renderInputOc(event){
    RecibirOcActions.renderInputOc(event.target.id,event.target.value)
  }
  renderInputOcTotal(event){
    RecibirOcActions.renderInputOcTotal(event.target.id,event.target.value)
  }
  updateOc(event) {
    event.preventDefault()
    event.persist()
    RecibirOcActions.updateOc(event);
  }
  addOc(event) {
    event.preventDefault()
    event.persist()
    RecibirOcActions.addOc(event);
  }

  render() {
  	if(this.state.obj){
	    return(
	      <RecibirOcIndex
        scrollWin={this.props.scrollWin} 
	      obj={this.state.obj}
	      renderInput={this.renderInput.bind(this)}
	      renderInputOc={this.renderInputOc.bind(this)}
	      renderInputOcTotal={this.renderInputOcTotal.bind(this)}
        updateOc={this.updateOc.bind(this)}
        addOc={this.addOc.bind(this)}
	      />       
	    )
	}else{
		return(
	      <div><h1>Cargando ...</h1> </div>       
	    )
	}
  }

}
