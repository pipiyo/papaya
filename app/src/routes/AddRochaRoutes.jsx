import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

// import AddProductoActions from '../actions/AddProductoActions'
// import AddProductoStore from '../stores/AddProductoStore'

import AddRochaIndex from '../components/add-rocha'


// @ReactMixin.decorate(Reflux.connect(AddProductoStore, 'obj'))
export default class AddRochaRoutes extends React.Component {

  constructor() {
    super()
  }

  // addProducto(event) {
  //   event.preventDefault()
  //   event.persist()
  //   AddProductoActions.addProducto(event);
  // }
  
  render() {
      return (
        <AddRochaIndex />       
      )
  }

}


