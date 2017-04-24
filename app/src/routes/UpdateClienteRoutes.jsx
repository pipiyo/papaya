import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateClienteActions from '../actions/UpdateClienteActions'
import UpdateClienteStore from '../stores/UpdateClienteStore'

import UpdateClienteIndex from '../components/update-cliente'


@ReactMixin.decorate(Reflux.connect(UpdateClienteStore, 'obj'))
export default class AddClienteRoutes extends React.Component {

  constructor() {
    super()
  }

  updateCliente(event) {
    event.preventDefault()
    event.persist()
    UpdateClienteActions.updateCliente(event);
  }
  renderInput(event){
    UpdateClienteActions.renderInput(event.target.id,event.target.value)
  }
  componentWillMount(){
    UpdateClienteActions.searchCliente(this.props.params.id);
  }

  render() {
    if(this.state.obj) {
      return (
        <UpdateClienteIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        updateCliente={this.updateCliente.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


