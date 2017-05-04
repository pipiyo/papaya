import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateLineaActions from '../actions/UpdateLineaActions'
import UpdateLineaStore from '../stores/UpdateLineaStore'

import UpdateLineaIndex from '../components/update-linea'


@ReactMixin.decorate(Reflux.connect(UpdateLineaStore, 'obj'))
export default class AddLineaRoutes extends React.Component {

  constructor() {
    super()
  }

  updateLinea(event) {
    event.preventDefault()
    event.persist()
    UpdateLineaActions.updateLinea(event);
  }
  renderInput(event){
    UpdateLineaActions.renderInput(event.target.id,event.target.value)
  }
  componentWillMount(){
    UpdateLineaActions.searchLinea(this.props.params.id);
  }

  render() {
    if(this.state.obj) {
      return (
        <UpdateLineaIndex
        obj={this.state.obj}
        renderInput={this.renderInput.bind(this)}
        updateLinea={this.updateLinea.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


