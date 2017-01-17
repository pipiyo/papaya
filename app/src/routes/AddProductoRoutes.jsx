import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddProductoIndex from '../components/add-producto'


export default class AddProductoRoutes extends React.Component {

  constructor() {
    super()
  }
  
  render() {
      return (
        <AddProductoIndex
        />       
      )
  }

}


