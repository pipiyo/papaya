import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import RecibirValeActions from '../actions/RecibirValeActions'
import Env from '../Config'
import io from 'socket.io-client'


const socket = io.connect( `${Env.url}valeDeEmision` )

let RecibirValeStore = Reflux.createStore({
  listenables: [RecibirValeActions],
  obj: { 
    renderVale: '',
    renderProductos: '',
    mensaje: '',
    input : {codigo:"", proveedor:""},
    codigos : [],
    cantidad : [],
    recibido : [],
    ricibos : [],
    diferencia : [],
    stock : []
  },
  updateVale: function(ev){
    let count = document.querySelectorAll("[data-countvale]").length

    let oc = {
      codigo: ev.target.elements['codigo'].value,
      producto: [],
      recibido: [],  
      entregado: [],
      diferencia : [],
      stock: [],
      fecha : this.fechaActual()
    }
    let i = 0
    for(i; i < count; i++){
      oc.producto.push(ev.target.elements[`codigo-${i}`].value)
      oc.recibido.push(ev.target.elements[`recibido-${i}`].value)
      oc.entregado.push(ev.target.elements[`entregado-${i}`].value)
      oc.diferencia.push(ev.target.elements[`diferencia-${i}`].value)
      //oc.stock.push(ev.target.elements[`stock-${i}`].value)
    }

    socket.emit('updateValeRecibir', oc, JSON.stringify( localStorage.getItem('token')), (n) => {
      this.obj.mensaje = n.mensaje
      browserHistory.push(`/home/listado-vale`)
    })
  },
  searchVale: function(id){
  	socket.emit('searchVale', id, (n) => {
      this.obj.renderVale = n.vale
      this.obj.renderProductos = n.productos

      this.obj.input.codigo = this.validador(this.obj.renderVale[0].COD_VALE)

      let i
      for(i=0; this.obj.renderProductos.length > i ; i++){
        this.obj.codigos[i] = this.validador(this.obj.renderProductos[i].CODIGO_PRODUCTO)
        this.obj.cantidad[i] = this.validador(this.obj.renderProductos[i].CANTIDAD_SOLICITADA)
        this.obj.stock[i] = (this.obj.renderProductos[i].STOCK_ACTUAL)?this.obj.renderProductos[i].STOCK_ACTUAL:0;
        this.obj.recibido[i] = (this.obj.renderProductos[i].CANTIDAD_ENTREGADA)?this.obj.renderProductos[i].CANTIDAD_ENTREGADA:0;
        this.obj.diferencia[i] = (this.obj.renderProductos[i].DIFERENCIA)?this.obj.renderProductos[i].DIFERENCIA:this.obj.renderProductos[i].CANTIDAD_SOLICITADA
      }
      this.trigger(this.obj)
    })
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
    let stock = document.getElementById(`stock-${item[1]}`).value
    let total = parseInt(cantidad) - (parseInt(recibido) + parseInt(entregado))

    if(recibido == "" || total < 0 || recibido > stock){
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

export default RecibirValeStore