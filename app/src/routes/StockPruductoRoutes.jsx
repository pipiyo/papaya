import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import StockProductoActions from '../actions/StockProductoActions'
import StockProductoStore from '../stores/StockProductoStore'


import StockProductoIndex from '../components/stock-producto'


export default class StockProductoRoutes extends React.Component {

  constructor() {
    super()
  }
  stockProducto(event) {
    event.preventDefault()
    event.persist()
    StockProductoActions.stockProducto(event,this.props.params.bodega,this.props.params.id);
  }
  render() {
      return (
        <StockProductoIndex
        stockProducto={this.stockProducto.bind(this)} 
        />       
      )
  }

}


