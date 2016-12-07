import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import SubServicioActions from '../actions/SubServicioActions'
import SubServicioStore from '../stores/SubServicioStore'

import ServicioIndex from '../components/sub-servicio'

@ReactMixin.decorate(Reflux.connect(SubServicioStore, 'obj'))
export default class SubServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    SubServicioActions.formTrigger()
  }
  renderArea(ev) {
    SubServicioActions.renderArea(ev.target.value);
  }
  addServicio(event) {
    event.preventDefault()
    event.persist()
    SubServicioActions.addSubServicio(event,this.props.params.id);
  }
  render() {
      return (
        <ServicioIndex 
        fecha={this.state.obj.item.fecha}
        tipo={this.props.params.tipo} 
        mensaje={this.state.obj.mensaje} 
        area={this.state.obj.area} 
        addServicio={this.addServicio.bind(this)} 
        renderArea={this.renderArea.bind(this)} />       
      )
  }

}


