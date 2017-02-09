import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import DescriptionOcActions from '../actions/DescriptionOcActions'
import Env from '../Config'
import io from 'socket.io-client'


const socket = io.connect( `${Env.url}ordenDeCompra` )

let DescriptionOcStore = Reflux.createStore({
  listenables: [DescriptionOcActions],
  obj: { 
    renderOc: '',
    renderProductos: ''
  },
  searchOc: function(id){
  	socket.emit('searchOc', id, (n) => {
      this.obj.renderOc = n.oc
      this.obj.renderProductos = n.productos
      this.trigger(this.obj)
    })
  }
})

export default DescriptionOcStore


