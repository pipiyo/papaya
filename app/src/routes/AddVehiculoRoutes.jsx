import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddVehiculoActions from '../actions/AddVehiculoActions'
import AddVehiculoStore from '../stores/AddVehiculoStore'

import AddVehiculoIndex from '../components/add-vehiculo'


@ReactMixin.decorate(Reflux.connect(AddVehiculoStore, 'obj'))
export default class AddVehiculoRoutes extends React.Component {

  constructor() {
    super()
  }

  addVehiculo(event) {
    event.preventDefault()
    event.persist()
    AddVehiculoActions.addVehiculo(event);
  }

  render() {
    if(this.state.obj) {
      return (
        <AddVehiculoIndex
        obj={this.state.obj}
        addVehiculo={this.addVehiculo.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


