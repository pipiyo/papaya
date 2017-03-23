import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import SubActividad  from '../components/vale-emision/SubActividad'
import ValeProductoItem from '../components/vale-emision/ValeProductoItem'

import ValeEmisionActions from '../actions/ValeEmisionActions'
import DialogActions from '../actions/DialogActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}emisionVale` )

let ValeEmisionStore = Reflux.createStore({
  listenables: [ValeEmisionActions],
  obj: { 
    numeroVale: '',
    compVale:[],
    numVale:30,
    mensaje: {title:"",texto:"",estado:false},
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment()} }
  },
  resetSelect: function(){
    this.obj.numeroOC = ''
    this.obj.compVale = []
    this.obj.numVale = 30
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
  },
  completSelect: function() {
    this.resetSelect()
    socket.emit('completSelect', (n) => {
      this.obj.numeroVale = n.numeroOc[0].NUMEROVALE

      let i

      for(i = 1; i <= this.obj.numVale; i++){
        this.obj.compVale.push(<ValeProductoItem num={i} key={i} />)
      }
      this.trigger(this.obj)
      
    })
  },
  addVale: function(ev){
  
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

    let count = document.querySelectorAll("[data-countemisionoc]").length
    for(let i = 1; i <= count; i++){
      if(ev.target.elements[`emisionvalecodigo-${i}`].value.length > 0){
        vale.valeCodigo.push(ev.target.elements[`emisionvalecodigo-${i}`].value)
        vale.valeDescripcion.push(ev.target.elements[`emisionvaledescripcion-${i}`].value)
        vale.valeObservaciones.push(ev.target.elements[`emisionvaleobservaciones-${i}`].value)
        vale.valeCantidad.push(ev.target.elements[`emisionvalecantidad-${i}`].value)
        vale.valePreciol.push(ev.target.elements[`emisionvalepreciol-${i}`].value)
      }
    }
    socket.emit('addVale', vale, JSON.stringify( localStorage.getItem('token')), (n) => {

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

export default ValeEmisionStore