import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddProductoActions from '../actions/AddProductoActions'
import AddProductoStore from '../stores/AddProductoStore'

import AddProductoIndex from '../components/add-producto'


@ReactMixin.decorate(Reflux.connect(AddProductoStore, 'obj'))
export default class AddProductoRoutes extends React.Component {

  constructor() {
    super()
  }

  addProducto(event) {
    event.preventDefault()
    event.persist()
    AddProductoActions.addProducto(event);
  }
  
  render() {
      return (
        <AddProductoIndex
         obj={this.state.obj}
         addProducto={this.addProducto.bind(this)} 
        />       
      )
  }

}


