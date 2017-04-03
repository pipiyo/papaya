import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import RecibirOcActions from '../actions/RecibirOcActions'
import Env from '../Config'
import io from 'socket.io-client'


const socket = io.connect( `${Env.url}ordenDeCompra` )

let RecibirOcStore = Reflux.createStore({
  listenables: [RecibirOcActions],
  obj: { 
    renderOc: '',
    recibo: '',
    devolucion: '',
    id:'',
    renderProductos: '',
    mensaje: '',
    input : {codigo:"", proveedor:""},
    codigos : [],
    cantidad : [],
    recibido : [],
    ricibos : [],
    diferencia : [],
    guia : []
  },
  updateOc: function(ev){
    let count = document.querySelectorAll("[data-countoc]").length

    let oc = {
      codigo: ev.target.elements['codigo'].value,
      producto: [],
      recibido: [],  
      entregado: [],
      diferencia : [],
      guia: [],
      fecha : this.fechaActual()
    }
    let i = 0
    for(i; i < count; i++){
      oc.producto.push(ev.target.elements[`codigo-${i}`].value)
      oc.recibido.push(ev.target.elements[`recibido-${i}`].value)
      oc.entregado.push(ev.target.elements[`entregado-${i}`].value)
      oc.diferencia.push(ev.target.elements[`diferencia-${i}`].value)
      oc.guia.push(ev.target.elements[`guia-${i}`].value)
    }

    socket.emit('updateOcRecibir', oc, JSON.stringify( localStorage.getItem('token')), (n) => {
      this.obj.mensaje = n.mensaje
      browserHistory.push(`/home/listado-oc`)
    })
  },
  addOc: function(ev){
    let count = document.querySelectorAll("[data-countoc]").length

    let oc = {
      codigo: document.getElementById('codigo').value,
      ocProducto: document.getElementById('ocProducto').value,
      razon: document.getElementById('razon').value,
      cantidad: document.getElementById('cantidad').value,
      fecha : this.fechaActual()
    }

    socket.emit('addOcRecibir', oc,JSON.stringify( localStorage.getItem('token')), (n) => {
      this.obj.mensaje = n.mensaje
      this.searchOc(this.obj.id)
    })
  },
  searchOc: function(id){
  	socket.emit('searchOc', id, (n) => {
      this.obj.recibo = n.recibo
      this.obj.devolucion = n.devolucion
      this.obj.renderOc = n.oc
      this.obj.renderProductos = n.productos
      this.obj.id = id

      this.obj.input.codigo = this.validador(this.obj.renderOc[0].CODIGO_OC)
      this.obj.input.proveedor = this.validador(this.obj.renderOc[0].NOMBRE_PROVEEDOR)

      let i
      for(i=0; this.obj.renderProductos.length > i ; i++){
        this.obj.codigos[i] = this.validador(this.obj.renderProductos[i].CODIGO_PRODUCTO)
        this.obj.cantidad[i] = this.validador(this.obj.renderProductos[i].CANTIDAD)
        this.obj.recibido[i] = this.obj.renderProductos[i].CANTIDAD_RECIBIDA
        this.obj.diferencia[i] = this.obj.renderProductos[i].DIFERENCIA
        this.obj.guia[i] = this.validador(this.obj.renderProductos[i].GUIA_DESPACHO)
      }
      this.trigger(this.obj)
    })
  },

  renderInput: function(id,valor){
    switch(id) {
      case "codigo":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "proveedor":
       this.obj.input.proveedor = this.validador(valor)
      break;
    }
    this.trigger(this.obj)    
  },
  renderInputOc: function(id,valor){
    let item = id.split("-")

    switch(item[0]) {
      case "guia":
       this.obj.guia[item[1]] = this.validador(valor)
      break;
    }

    this.trigger(this.obj)    
  },
  formatNumber : function(numero){
    return numero.replace(/[^0-9.]/g,'')
  },
  renderInputOcTotal: function(id,valor){
    let item = id.split("-")
    let cantidad = this.formatNumber(document.getElementById(`cantidad-${item[1]}`).value)
    let recibido = this.formatNumber(document.getElementById(`recibido-${item[1]}`).value)
    let entregado = this.formatNumber(document.getElementById(`entregado-${item[1]}`).value)
    let diferencia = this.formatNumber(document.getElementById(`diferencia-${item[1]}`).value)
    let total = parseInt(cantidad) - (parseInt(recibido) + parseInt(entregado))
    if(recibido == "" || total < 0){
      recibido = 0;
      document.getElementById(`recibido-${item[1]}`).value = ""
    }
    this.obj.diferencia[item[1]] = parseInt(cantidad) - (parseInt(recibido) + parseInt(entregado)) 
    this.trigger(this.obj)    
  },
  fechaActual: function(){
    let hoy = new Date()
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 
    return yyyy+'-'+mm+'-'+dd
  },
  validador: function(validador){
    let text
    if(validador == "" || validador == null  || !validador){
      text = ""
    }else{
      text = validador
    }
    return text
  }
})

export default RecibirOcStore