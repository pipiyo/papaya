import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import SubActividad  from '../components/orden-compra/SubActividad'
import OcProductoItem from '../components/orden-compra/OcProductoItem'

import ordenCompraActions from '../actions/ordenCompraActions'
import DialogActions from '../actions/DialogActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}emisionOc` )

let ordenCompraStore = Reflux.createStore({
  listenables: [ordenCompraActions],
  obj: { 
    numeroOC: '',
    sub:'',
    compSub:[],
    numSub:1,
    compOc:[],
    numOc:30,
    mensaje: {title:"",texto:"",estado:false},
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment()} }
  },
  resetSelect: function(){
    this.obj.numeroOC = ''
    this.obj.sub = ''
    this.obj.compSub = []
    this.obj.numSub = 1
    this.obj.compOc = []
    this.obj.numOc = 30
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
  },
  completSelect: function() {
    this.resetSelect()
    socket.emit('completSelect', (n) => {
      this.obj.numeroOC = n.numeroOc[0].NUMEROOC
      this.obj.sub = n.sub
      this.obj.compSub.push(<SubActividad sub={this.obj.sub} num={this.obj.numSub} key={this.obj.numSub} />)

      let i
      for(i = 1; i <= this.obj.numOc; i++){
        this.obj.compOc.push(<OcProductoItem num={i} key={i} />)
      }
      this.trigger(this.obj)
      
    })
  },
  addOc: function(ev){
    let despachar = ev.target.elements['despachar'].value
    let despacharNombre, despacharDireccion, despacharComuna, despacharRut, despacharTelefono
    switch(despachar) {
      case "Fabrica":
        despacharNombre = "Muebles y Diseños S.A."
        despacharDireccion = "Av. Santa Rosa 5721"
        despacharComuna = "San Miguel"
        despacharRut = "77.003.680-1"
        despacharTelefono = "920 71 75"
      break;
      case "Los Conquistadores":
        despacharNombre = "Rocha S.A. Multiooficina"
        despacharDireccion = "Av. Los Conquistadores 2635"
        despacharComuna = "Providencia"
        despacharRut =  "77.003-680-1"
        despacharTelefono = "2586 21 96, 258621 97"
      break;
      case "La Dehesa":
        despacharNombre = "Rocha S.A. Multiooficina"
        despacharDireccion = "Av. La Dehesa 181, Oficina 409"
        despacharComuna =  "Lo Barnechea"
        despacharRut = "77.003.680-1"
        despacharTelefono = "321 2095"
      break;
    }
    let oc = {
      despacharNombre: despacharNombre,
      despacharDireccion: despacharDireccion,
      despacharComuna: despacharComuna,  
      despacharRut: despacharRut,
      despacharTelefono : despacharTelefono,
      empresa: ev.target.elements['empresa'].value,
      rochaProyecto : ev.target.elements['rocha'].value,
      fechaRealizacion : ev.target.elements['fechaInicio'].value,
      fechaEntrega : ev.target.elements['fechaEntrega'].value,
      nombreProveedor: ev.target.elements['proveedor'].value,
      rutProveedor: ev.target.elements['rut-proveedor'].value,
      condicionPago : ev.target.elements['forma-pago'].value,
      reclamo : ev.target.elements['reclamo'].value,
      subActividad: [],
      subTotal: ev.target.elements[`emisionocsubtotal`].value,
      neto: ev.target.elements[`emisionocneto`].value,
      tipoIva: "Iva",
      iva: ev.target.elements[`emisionociva`].value,
      descuentoOc : ev.target.elements[`emisionocdescuentopor`].value,
      descuento2: ev.target.elements[`emisionocdescuentopes`].value,
      total : ev.target.elements[`emisionoctotalfinal`].value,
      observaciones : ev.target.elements[`emisionocobservaciones`].value,
      ocpCodigo : [],
      ocpDescripcion : [],
      ocpRocha: [],
      ocpObservaciones: [],
      ocpCantidad: [],
      ocpPreciob : [],
      ocpPreciou : [],
      ocpPreciol : [],
      ocpDescuento : [],
      ocpTotal: []

    }
    let count = document.querySelectorAll("[data-countsubavtividad]").length
    for(let i = 1; i <= count; i++){
      oc.subActividad.push(ev.target.elements[`subactividad-${i}`].value)
    }

    let count1 = document.querySelectorAll("[data-countemisionoc]").length
    for(let i = 1; i <= count1; i++){
      if(ev.target.elements[`emisionoccodigo-${i}`].value.length > 0){
        oc.ocpCodigo.push(ev.target.elements[`emisionoccodigo-${i}`].value)
        oc.ocpDescripcion.push(ev.target.elements[`emisionocdescripcion-${i}`].value)
        oc.ocpRocha.push(ev.target.elements[`emisionocrocha-${i}`].value)
        oc.ocpObservaciones.push(ev.target.elements[`emisionocobservaciones-${i}`].value)
        oc.ocpCantidad.push(ev.target.elements[`emisionoccantidad-${i}`].value)
        oc.ocpPreciob.push(ev.target.elements[`emisionocpreciob-${i}`].value)
        oc.ocpPreciou.push(ev.target.elements[`emisionocpreciou-${i}`].value)
        oc.ocpPreciol.push(ev.target.elements[`emisionocpreciol-${i}`].value)
        oc.ocpDescuento.push(ev.target.elements[`emisionocdescuento-${i}`].value)
        oc.ocpTotal.push(ev.target.elements[`emisionoctotal-${i}`].value)
      }
    }
    socket.emit('addOc', oc, JSON.stringify( localStorage.getItem('token')), (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
      browserHistory.push(`/home/listado-oc`)
    })

  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  addSubActividad: function(){
    this.obj.numSub = this.obj.numSub + 1
    this.obj.compSub.push(<SubActividad sub={this.obj.sub} num={this.obj.numSub} key={this.obj.numSub} />)
    this.trigger(this.obj)
  },
  addRowOc: function(){
    this.obj.numOc = this.obj.numOc + 1
    this.obj.compOc.push(<OcProductoItem num={this.obj.numOc} key={this.obj.numOc} />)
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

export default ordenCompraStore