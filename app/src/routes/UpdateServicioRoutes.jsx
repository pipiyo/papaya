import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateServicioActions from '../actions/UpdateServicioActions'
import UpdateServicioStore from '../stores/UpdateServicioStore'

import ServicioIndex from '../components/update-servicio'

@ReactMixin.decorate(Reflux.connect(UpdateServicioStore, 'obj'))
export default class UpdateServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateServicioActions.formTrigger()
    UpdateServicioActions.searchServicio(this.props.params.id)
  }
  updateServicio(event) {
    event.preventDefault()
    event.persist()
    UpdateServicioActions.updateServicio(event); 
  }
  render() {   
      if(this.state.obj.servicio) {
      return (
        <ServicioIndex 
          input={this.state.obj.input}
          datos={this.state.obj.servicio}
          area={this.state.obj.area}  
          tipo={this.props.params.tipo} 
          updateServicio={this.updateServicio.bind(this)} 
          />       
      )
      }else{
        return (
          <div><h1>Cargando</h1></div>     
        )
      }
  }

}


