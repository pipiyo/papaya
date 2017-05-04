import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddLineaActions from '../actions/AddLineaActions'
import AddLineaStore from '../stores/AddLineaStore'

import AddLineaIndex from '../components/add-linea'


@ReactMixin.decorate(Reflux.connect(AddLineaStore, 'obj'))
export default class AddLineaRoutes extends React.Component {

  constructor() {
    super()
  }

  addLinea(event) {
    event.preventDefault()
    event.persist()
    AddLineaActions.addLinea(event);
  }

  render() {
    if(this.state.obj) {
      return (
        <AddLineaIndex
        obj={this.state.obj}
        addLinea={this.addLinea.bind(this)} 
        />       
      )
    }else{
      return (
          <div><h1>Cargando</h1></div>     
        )
    }
  }

}


