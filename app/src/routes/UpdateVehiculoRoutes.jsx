import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateVehiculoActions from '../actions/UpdateVehiculoActions'
import UpdateVehiculoStore from '../stores/UpdateVehiculoStore'

import UpdateVehiculoIndex from '../components/update-vehiculo'


@ReactMixin.decorate(Reflux.connect(UpdateVehiculoStore, 'obj'))
export default class AddVehiculoRoutes extends React.Component {

  constructor() {
    super()
  }

  updateVehiculo(event) {
    event.preventDefault()
    event.persist()
    UpdateVehiculoActions.updateVehiculo(event);
  }
  renderInput(event){
    UpdateVehiculoActions.renderInput(event.target.id,event.target.value)
  }
  componentWillMount(){
    UpdateVehiculoActions.searchVehiculo(this.props.params.id);
  }

  render() {
    if(this.state.obj) {
      return (
        <UpdateVehiculoIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        updateVehiculo={this.updateVehiculo.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


