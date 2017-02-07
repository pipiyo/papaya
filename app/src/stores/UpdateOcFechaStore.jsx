import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import UpdateOcFechaActions from '../actions/UpdateOcFechaActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}ordenDeCompra` )

let UpdateOcFechaStore = Reflux.createStore({
  listenables: [UpdateOcFechaActions],
  obj: { 
    mensaje: '',
    search: '',
    input : {codigo:"", fechaActa:"", fechaConfirmacion: "", estado: ""},
  },
  updateFechaOc: function(ev,bodega){
    let oc = {
      "codigo": this.obj.input.codigo,
      "fechaConfirmacion": ev.target.elements['fechaConfirmacion'].value ,
      "fechaActa": ev.target.elements['fechaActa'].value,
      "estado": ev.target.elements['estado'].value
    }
    socket.emit('updateFechaOc', oc, (n) => {
      this.obj.mensaje = n.mensaje
      browserHistory.push(`/home/listado-oc`)
    })
  },
  searchOc: function(id){
    socket.emit('searchOc', id, (n) => {
      this.obj.search = n.oc
      this.obj.input.fechaActa= (moment(this.obj.search[0].FECHA_ENVIO_VALIJA).isValid())?moment(this.obj.search[0].FECHA_ENVIO_VALIJA):undefined
      this.obj.input.fechaConfirmacion= (moment(this.obj.search[0].FECHA_CONFIRMACION).isValid())?moment(this.obj.search[0].FECHA_CONFIRMACION):undefined
      this.obj.input.estado = this.obj.search[0].ESTADO
      this.obj.input.codigo = id
      this.trigger(this.obj)
    })
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
  renderFechaConfirmacion: function(fecha){
    this.obj.input.fechaConfirmacion = fecha
    this.trigger(this.obj)
  },
  renderFechaActa: function(fecha){
    this.obj.input.fechaActa = fecha
    this.trigger(this.obj)
  }
  
})

export default UpdateOcFechaStore