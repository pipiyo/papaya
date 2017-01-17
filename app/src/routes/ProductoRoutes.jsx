import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ProductoIndex from '../components/producto'


export default class ProductoRoutes extends React.Component {

  constructor() {
    super()
  }
  
  render() {
      return (
        <ProductoIndex
        />       
      )
  }

}


