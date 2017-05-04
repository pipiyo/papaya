import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateProveedorActions from '../actions/UpdateProveedorActions'
import UpdateProveedorStore from '../stores/UpdateProveedorStore'

import UpdateProveedorIndex from '../components/update-proveedor'


@ReactMixin.decorate(Reflux.connect(UpdateProveedorStore, 'obj'))
export default class AddProveedorRoutes extends React.Component {

  constructor() {
    super()
  }

  updateProveedor(event) {
    event.preventDefault()
    event.persist()
    UpdateProveedorActions.updateProveedor(event);
  }
  renderInput(event){
    UpdateProveedorActions.renderInput(event.target.id,event.target.value)
  }
  componentWillMount(){
    UpdateProveedorActions.searchProveedor(this.props.params.id);
  }

  render() {
    if(this.state.obj) {
      return (
        <UpdateProveedorIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        updateProveedor={this.updateProveedor.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


