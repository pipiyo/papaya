import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateSubServicioActions from '../actions/UpdateSubServicioActions'
import UpdateSubServicioStore from '../stores/UpdateSubServicioStore'

import ServicioIndex from '../components/update-sub-servicio'

@ReactMixin.decorate(Reflux.connect(UpdateSubServicioStore, 'obj'))
export default class UpdateSubServicioRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateSubServicioActions.formTrigger()
    UpdateSubServicioActions.searchSubServicio(this.props.params.id);
  }
  componentWillReceiveProps(nextProps, nextState){
    UpdateSubServicioActions.searchSubServicio(nextProps.params.id);
  }
  updateServicio(event) {
    event.preventDefault()
    event.persist()
    UpdateSubServicioActions.updateSubServicio(event); 
  }
  render() {
      if(this.state.obj.search) {
      return (
        <ServicioIndex
        input={this.state.obj.input} 
        datos={this.state.obj.search} 
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


