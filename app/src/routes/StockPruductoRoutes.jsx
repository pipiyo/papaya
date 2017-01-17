import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import StockProductoIndex from '../components/stock-producto'


export default class StockProductoRoutes extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <StockProductoIndex
        />       
      )
  }

}


