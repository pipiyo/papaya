import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddProveedorActions from '../actions/AddProveedorActions'
import AddProveedorStore from '../stores/AddProveedorStore'

import AddProveedorIndex from '../components/add-proveedor'


@ReactMixin.decorate(Reflux.connect(AddProveedorStore, 'obj'))
export default class AddProveedorRoutes extends React.Component {

  constructor() {
    super()
  }

  addProveedor(event) {
    event.preventDefault()
    event.persist()
    AddProveedorActions.addProveedor(event);
  }
  renderInput(event){
    AddProveedorActions.renderInput(event.target.id,event.target.value)
  }

  render() {
    if(this.state.obj) {
      return (
        <AddProveedorIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        addProveedor={this.addProveedor.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


