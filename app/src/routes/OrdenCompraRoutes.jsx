import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import OrdenCompraIndex from '../components/orden-compra'


export default class OrdenCompraRoutes extends React.Component {

  constructor() {
    super()
  }
  
  render() {
      return (
        <OrdenCompraIndex
        />       
      )
  }

}


