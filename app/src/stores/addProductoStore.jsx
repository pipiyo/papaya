import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import AddProductoActions from '../actions/AddProductoActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}producto` )

let AddProductoStore = Reflux.createStore({
  listenables: [AddProductoActions],
  obj: { 
    mensaje: '',
  },
  getInitialState: function() {
    return this.obj
  },
  addProducto: function(ev){
    let producto = {
      "codigo": ev.target.elements['codigo'].value,
      "descripcion": ev.target.elements['descripcion'].value ,
      "formato": ev.target.elements['formato'].value,
      "um": ev.target.elements['um'].value,
      "categoria": ev.target.elements['categoria'].value,
      "precio": ev.target.elements['precio'].value,
      "stockMin": ev.target.elements['stock-min'].value,
      "stockMax": ev.target.elements['stock-max'].value   
    }
    socket.emit('addProducto', producto, (n) => {

      if(ev.target.elements['formato']){ev.target.elements['formato'].options[0].selected = "selected"}
      if(ev.target.elements['um']){ev.target.elements['um'].options[0].selected = "selected"}
      if(ev.target.elements['categoria']){ev.target.elements['categoria'].options[0].selected = "selected"}
      if(ev.target.elements['codigo']){ev.target.elements['codigo'].value = ""}
      if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
      if(ev.target.elements['precio']){ev.target.elements['precio'].value = ""}
      if(ev.target.elements['stockMin']){ev.target.elements['stockMin'].value = ""}
      if(ev.target.elements['stockMax']){ev.target.elements['stockMax'].value = ""}

      this.obj.mensaje = n.mensaje
      this.trigger(this.obj)
    })
  },
  
})

export default AddProductoStore