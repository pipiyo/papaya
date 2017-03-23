import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import SubActividad  from '../components/update-vale/SubActividad'
import ValeProductoItem from '../components/update-vale/ValeProductoItem'

import UpdateValeActions from '../actions/UpdateValeActions'
import DialogActions from '../actions/DialogActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}emisionVale` )

let UpdateValeStore = Reflux.createStore({
  listenables: [UpdateValeActions],
  obj: { 
    vale : '',
    valepro : '',
    numeroVale: '',
    compVale:[],
    numVale:30,
    mensaje: {title:"",texto:"",estado:false},
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment()} }
  },
  resetSelect: function(){
    this.obj.vale = ''
    this.obj.valepro = ''
    this.obj.numeroVale = ''
    this.obj.compVale = []
    this.obj.numVale = 30
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
  },
  completSelect: function(id) {
    this.resetSelect()
    socket.emit('completSelectUpdate',id, (n) => {
      this.obj.vale = n.vale[0]
      this.obj.valepro = n.valepro
      this.obj.numeroVale = n.vale[0].COD_VALE
      this.obj.item.fecha.fechaInicio = moment(n.vale[0].FECHA)
      this.obj.item.fecha.fechaEntrega = moment(n.vale[0].FECHA_TERMINO)
      this.obj.numVale = n.valepro.length
      let i

      for(i = 1; i <= this.obj.numVale; i++){
        this.obj.compVale.push(<ValeProductoItem num={i} key={i} />)
      }
      this.trigger(this.obj)
      
    })
  },
  completInput: function(){
    let i,e
    for(i = 1; i <= this.obj.numVale; i++){
      e = i - 1
      document.getElementById(`editarvalecantidad-${i}`).value = this.obj.valepro[e].CANTIDAD_SOLICITADA
      document.getElementById(`editarvalepreciol-${i}`).value = this.obj.valepro[e].PRECIO
      document.getElementById(`editarvalestock-${i}`).value = this.obj.valepro[e].STOCK_ACTUAL
      document.getElementById(`editarvaleobservaciones-${i}`).value = this.obj.valepro[e].OBSERVACIONES
      document.getElementById(`editarvaledescripcion-${i}`).value = this.obj.valepro[e].DESCRIPCION
      document.getElementById(`editarvalecodigo-${i}`).value = this.obj.valepro[e].CODIGO_PRODUCTO
    }
    document.querySelector(`[data-txteditarvale="rocha"]`).value = this.obj.vale.CODIGO_PROYECTO
    document.querySelector(`[data-txteditarvale="empleado"]`).value = this.obj.vale.EMPLEADO
    this.selectOption(document.querySelector(`[data-txteditarvale="departamento"]`),this.obj.vale.DEPARTAMENTO, true)
  },
  selectOption: function(numero, seleccion, tipo){
    let i
    for(i = 0; numero.length > i; i++){
      if(seleccion){
        if(tipo){
          if(numero.options[i].value.toLowerCase() == seleccion.toLowerCase()){numero.options[i].selected = "selected"}
        }else{
          if(numero.options[i].value == seleccion){numero.options[i].selected = "selected"}
        }
      }
    }
  },
  updateVale: function(ev,id){
    let vale = {
      departamento: ev.target.elements['departamento'].value,
      rochaProyecto : ev.target.elements['rocha'].value,
      fechaRealizacion : ev.target.elements['fechaInicio'].value,
      fechaEntrega : ev.target.elements['fechaEntrega'].value,
      empleado : ev.target.elements['empleado'].value,
      valeCodigo : [],
      valeDescripcion : [],
      valeObservaciones: [],
      valeCantidad: [],
      valePreciol : []
    }

    let count = document.querySelectorAll("[data-counteditarvale]").length
    console.log(count)
    for(let i = 1; i <= count; i++){
      if(ev.target.elements[`editarvalecodigo-${i}`].value.length > 0){
        vale.valeCodigo.push(ev.target.elements[`editarvalecodigo-${i}`].value)
        vale.valeDescripcion.push(ev.target.elements[`editarvaledescripcion-${i}`].value)
        vale.valeObservaciones.push(ev.target.elements[`editarvaleobservaciones-${i}`].value)
        vale.valeCantidad.push(ev.target.elements[`editarvalecantidad-${i}`].value)
        vale.valePreciol.push(ev.target.elements[`editarvalepreciol-${i}`].value)
      }
    }
    console.log(vale)
    socket.emit('updateVale',vale,id, JSON.stringify( localStorage.getItem('token')), (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
      browserHistory.push(`/home/listado-vale`)
    })

  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  addRowVale: function(){
    this.obj.numVale = this.obj.numVale + 1
    this.obj.compVale.push(<ValeProductoItem num={this.obj.numVale} key={this.obj.numVale} />)
    this.trigger(this.obj)
  },
  renderFechaInicio: function(fecha){
    this.obj.item.fecha.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.item.fecha.fechaEntrega = fecha
    this.trigger(this.obj)
  }
})

export default UpdateValeStore