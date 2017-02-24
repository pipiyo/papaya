import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateOcFechaActions from '../actions/UpdateOcFechaActions'
import UpdateOcFechaStore from '../stores/UpdateOcFechaStore'

import UpdateOcFechaIndex from '../components/update-oc-fecha'

@ReactMixin.decorate(Reflux.connect(UpdateOcFechaStore, 'obj'))
export default class UpdateOcFechaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateOcFechaActions.searchOc(this.props.params.id);
  }
  renderFechaActa(date){
    UpdateOcFechaActions.renderFechaActa(date)
  }
  renderFechaConfirmacion(date){
    UpdateOcFechaActions.renderFechaConfirmacion(date)
  }
  updateFechaOc(event) {
    event.preventDefault()
    event.persist()
    UpdateOcFechaActions.updateFechaOc(event)
  }
  render() {
  	if(this.state.obj){
      return (
        <UpdateOcFechaIndex 
       	obj={this.state.obj}
		    renderFechaConfirmacion={this.renderFechaConfirmacion.bind(this)} 
        renderFechaActa={this.renderFechaActa.bind(this)}
        updateFechaOc={this.updateFechaOc.bind(this)}    
        />       
      )
  	}else{
  		return (
        <div><h1>Cargando ...</h1></div>  
      )
  	}
  }

}


