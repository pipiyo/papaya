import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioActions from '../actions/ServicioActions'
import ServicioStore from '../stores/ServicioStore'

import ServicioIndex from '../components/servicio'


@ReactMixin.decorate(Reflux.connect(ServicioStore, 'obj'))
export default class ServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    if (this.state.obj.comunas == 'comunas') { ServicioActions.formTrigger() }
  }
  renderArea(ev) {
     ServicioActions.renderArea(ev.target.value);
  }
  addServicio(event) {
    event.preventDefault()
    event.persist()
    ServicioActions.addServicio(event) 
  }
  closeDialog(event) {
    event.preventDefault()
    ServicioActions.closeDialog() 
  }
  render() {
    console.log(this.props)
      return (
        <ServicioIndex 
        rocha={this.props.params.rocha} 
        tipo={this.props.params.tipo} 
        area={this.state.obj.area} 
        mensaje={this.state.obj.mensaje}
        fecha={this.state.obj.item.fecha}
        reclamo={this.state.obj.item.reclamo}  
        addServicio={this.addServicio.bind(this)} 
        renderArea={this.renderArea.bind(this)} 
        closeDialog={this.closeDialog.bind(this)} 
        />       
      )
  }

}


