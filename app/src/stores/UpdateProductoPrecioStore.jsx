import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import DialogActions from '../actions/DialogActions'

import UpdateProductoPrecioActions from '../actions/UpdateProductoPrecioActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}producto` )

let UpdateProductoPrecioStore = Reflux.createStore({
  listenables: [UpdateProductoPrecioActions],
  obj: { 
    mensaje: {title:"",texto:"",estado:false},
    search: '',
    input : {codigo:"", precio: "", precioVenta: ""},
  },
  getInitialState: function() {
    return this.obj
  },
  updateProducto: function(ev,bodega){
    let producto = {
      "codigo": ev.target.elements['codigo'].value,
      "precio": ev.target.elements['precio'].value,
      "precioVenta": ev.target.elements['precio-venta'].value 
    }
    socket.emit('updateProductoPrecio', producto, (n) => {
      /* Dialog */
        this.obj.mensaje.texto = n.mensaje
        this.obj.mensaje.title = 'Felicitaciones'
        this.obj.mensaje.estado = true
        setTimeout(this.closeDialog, 8000)
        DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchProducto: function(id){
    socket.emit('searchProducto', id, (n) => {
      this.obj.search = n.producto

      this.obj.input.codigo = this.validador(this.obj.search[0].CODIGO_PRODUCTO)
      this.obj.input.precioVenta = this.validador(this.obj.search[0].PRECIO_VENTA)
      this.obj.input.precio = this.validador(this.obj.search[0].PRECIO)
      this.trigger(this.obj)
    })
  },
  renderInput: function(id,valor){
    switch(id) {
      case "codigo":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "precio":
        this.obj.input.precio = this.validador(valor)
      break;
      case "precio-venta":
        this.obj.input.precioVenta = this.validador(valor)
      break;
    }
    this.trigger(this.obj)    
  },
  selectOption: function(numero, seleccion, tipo){
    let i
    for(i = 0; numero.length > i; i++){
      if(tipo){
        if(numero.options[i].value.toLowerCase() == seleccion.toLowerCase()){numero.options[i].selected = "selected"}
      }else{
        if(numero.options[i].value == seleccion){numero.options[i].selected = "selected"}
      }
    }
  },
  validador: function(validador){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }else{
      text = validador
    }
    return text
  }
  
})

export default UpdateProductoPrecioStore