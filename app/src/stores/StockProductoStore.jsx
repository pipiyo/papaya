import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import StockProductoActions from '../actions/StockProductoActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}producto` )

let StockProductoStore = Reflux.createStore({
  listenables: [StockProductoActions],
  obj: { 
    mensaje: '',
  },
  getInitialState: function() {
    return this.obj
  },
  stockProducto: function(ev,bodega,id){
    let producto = {
      "stock": ev.target.elements['stock'].value,
      "numero": ev.target.elements['numero'].value ,
      "rocha": ev.target.elements['rocha'].value,
      "codigo": id 
    }
    socket.emit('stockProducto', producto, (n) => {
      browserHistory.push(`/home/bodega/${bodega}`)
    })
  },
  
})

export default StockProductoStore