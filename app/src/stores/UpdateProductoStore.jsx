import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import UpdateProductoActions from '../actions/UpdateProductoActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}producto` )

let UpdateProductoStore = Reflux.createStore({
  listenables: [UpdateProductoActions],
  obj: { 
    mensaje: '',
    search: '',
    input : {codigo:"", categoria:"", descripcion: "", formato: "", um: "", categoria: "", precio: "", stockMin: "", stockMax: ""},
  },
  getInitialState: function() {
    return this.obj
  },
  updateProducto: function(ev,bodega){
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
    socket.emit('updateProducto', producto, (n) => {
      this.obj.mensaje = n.mensaje
      browserHistory.push(`/home/bodega/${bodega}`)
    })
  },
  searchProducto: function(id){
    socket.emit('searchProducto', id, (n) => {
      this.obj.search = n.producto

      this.obj.input.codigo = this.validador(this.obj.search[0].CODIGO_PRODUCTO)
      this.obj.input.categoria = this.validador(this.obj.search[0].CATEGORIA)
      this.obj.input.descripcion = this.validador(this.obj.search[0].DESCRIPCION)
      this.obj.input.formato = this.validador(this.obj.search[0].FORMATO)
      this.obj.input.um = this.validador(this.obj.search[0].UNIDAD_DE_MEDIDA)
      this.obj.input.precio = this.validador(this.obj.search[0].PRECIO)
      this.obj.input.stockMin = this.validador(this.obj.search[0].STOCK_MINIMO)
      this.obj.input.stockMax = this.validador(this.obj.search[0].STOCK_MAXIMO)
      this.trigger(this.obj)
    })
  },
  renderInput: function(id,valor){
    switch(id) {
      case "codigo":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "descripcion":
       this.obj.input.descripcion = this.validador(valor)
      break;
      case "precio":
        this.obj.input.precio = this.validador(valor)
      break;
      case "stock-min":
        this.obj.input.stockMin = this.validador(valor)
      break;
      case "stock-max":
        this.obj.input.stockMax = this.validador(valor)
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

export default UpdateProductoStore