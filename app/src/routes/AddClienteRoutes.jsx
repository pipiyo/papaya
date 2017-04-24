import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddClienteActions from '../actions/AddClienteActions'
import AddClienteStore from '../stores/AddClienteStore'

import AddClienteIndex from '../components/add-cliente'


@ReactMixin.decorate(Reflux.connect(AddClienteStore, 'obj'))
export default class AddClienteRoutes extends React.Component {

  constructor() {
    super()
  }

  addCliente(event) {
    event.preventDefault()
    event.persist()
    AddClienteActions.addCliente(event);
  }
  renderInput(event){
    AddClienteActions.renderInput(event.target.id,event.target.value)
  }

  render() {
    if(this.state.obj) {
      return (
        <AddClienteIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        addCliente={this.addCliente.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


