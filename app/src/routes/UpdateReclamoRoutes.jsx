import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateReclamoActions from '../actions/UpdateReclamoActions'
import UpdateReclamoStore from '../stores/UpdateReclamoStore'

import UpdateReclamoIndex from '../components/update-reclamo'


@ReactMixin.decorate(Reflux.connect(UpdateReclamoStore, 'obj'))
export default class AddReclamoRoutes extends React.Component {

  constructor() {
    super()
  }

  updateReclamo(event) {
    event.preventDefault()
    event.persist()
    UpdateReclamoActions.updateReclamo(event);
  }
  renderInput(event){
    UpdateReclamoActions.renderInput(event.target.id,event.target.value)
  }
  componentWillMount(){
    UpdateReclamoActions.searchReclamo(this.props.params.id);
  }
  renderFechaInicio(date){
    UpdateReclamoActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    UpdateReclamoActions.renderFechaEntrega(date)
  }

  render() {
    if(this.state.obj) {
      return (
        <UpdateReclamoIndex
        obj={this.state.obj}
        renderFechaInicio={this.renderFechaInicio.bind(this)} 
        renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
        renderInput={this.renderInput.bind(this)}
        updateReclamo={this.updateReclamo.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


