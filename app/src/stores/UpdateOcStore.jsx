import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import SubActividad  from '../components/update-oc/SubActividad'
import OcProductoItem from '../components/update-oc/OcProductoItem'

import UpdateOcActions from '../actions/UpdateOcActions'
import DialogActions from '../actions/DialogActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}emisionOc` )

let UpdateOcStore = Reflux.createStore({
  listenables: [UpdateOcActions],
  obj: { 
    oc : '',
    ocp : '',
    suboc : '',
    proveedor : '',
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
    this.obj.oc = ''
    this.obj.ocp = ''
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
  completSelect: function(id) {
    this.resetSelect()
    socket.emit('completSelectUpdate',id, (n) => {
      
      this.obj.suboc = n.suboc
      this.obj.ocp = n.ocp
      this.obj.oc = n.oc[0]
      this.obj.proveedor = n.pro[0]
      this.obj.item.fecha.fechaInicio = moment(n.oc[0].FECHA_REALIZACION)
      this.obj.item.fecha.fechaEntrega = moment(n.oc[0].FECHA_ENTREGA)
      this.obj.numeroOC = n.oc[0].CODIGO_OC
      this.obj.sub = n.sub
      this.obj.numSub = n.suboc.length
      this.obj.numOc = n.ocp.length
   
      let i
      for(i = 1; i <= this.obj.numSub; i++){
        this.obj.compSub.push(<SubActividad sub={this.obj.sub} num={i} key={i} />)
      }
      
      for(i = 1; i <= this.obj.numOc; i++){
        this.obj.compOc.push(<OcProductoItem num={i} key={i} />)
      }
      this.trigger(this.obj)
      
    })
  },
  completInput: function(){
    let i,e
    for(i = 1; i <= this.obj.numOc; i++){
      e = i - 1
      document.getElementById(`editaroccantidad-${i}`).value = this.obj.ocp[e].CANTIDAD
      document.getElementById(`editarocpreciol-${i}`).value = this.obj.ocp[e].PRECIO_LISTA
      document.getElementById(`editarocpreciou-${i}`).value = this.obj.ocp[e].PRECIO_UNITARIO
      document.getElementById(`editarocpreciob-${i}`).value = this.obj.ocp[e].PRECIO_BODEGA
      document.getElementById(`editaroctotal-${i}`).value = this.obj.ocp[e].TOTAL
      document.getElementById(`editarocdescuento-${i}`).value = this.obj.ocp[e].DESCUENTO
      document.getElementById(`editarocstock-${i}`).value = this.obj.ocp[e].STOCK_ACTUAL
      document.getElementById(`editarocobservaciones-${i}`).value = this.obj.ocp[e].OBSERVACION
      document.getElementById(`editarocrocha-${i}`).value = this.obj.ocp[e].ROCHA
      document.getElementById(`editarocdescripcion-${i}`).value = this.obj.ocp[e].DESCRIPCION
      document.getElementById(`editaroccodigo-${i}`).value = this.obj.ocp[e].CODIGO_PRODUCTO
    }

    for(i = 1; i <= this.obj.numSub; i++){
      e = i - 1
      this.selectOption(document.querySelector(`[data-txteditaroc="editarsubactividad-${i}"]`),this.obj.suboc[e].CODIGO_SUBSERVICIO, false)
    }

    document.querySelector(`[data-txteditaroc="rocha"]`).value = this.obj.oc.ROCHA_PROYECTO
    document.querySelector(`[data-txteditaroc="proveedor"]`).value = this.obj.oc.NOMBRE_PROVEEDOR
    document.querySelector(`[data-txteditaroc="pago"]`).value = this.obj.oc.CONDICION_PAGO
    document.querySelector(`[data-txteditaroc="reclamo"]`).value = this.obj.oc.RECLAMO
    document.querySelector(`[data-txteditaroc="codproveedor"]`).value = this.obj.proveedor.CODIGO_PROVEEDOR
    document.querySelector(`[data-txteditaroc="sub-total"]`).value = this.obj.oc.SUB_TOTAL
    document.querySelector(`[data-txteditaroc="descuento-oc"]`).value = this.obj.oc.DESCUENTO_OC
    document.querySelector(`[data-txteditaroc="descuento-2"]`).value = this.obj.oc.DESCUENTO_2
    document.querySelector(`[data-txteditaroc="neto"]`).value = this.obj.oc.NETO
    document.querySelector(`[data-txteditaroc="iva"]`).value = this.obj.oc.IVA
    document.querySelector(`[data-txteditaroc="total"]`).value = this.obj.oc.TOTAL
    document.querySelector(`[data-txteditaroc="observacion"]`).value = this.obj.oc.OBSERVACION
    let despachar
    switch(this.obj.oc.DESPACHAR_COMUNA) {
      case "San Miguel":
        despachar = "Fabrica"
      break;
      case "Providencia":
        despachar = "Los Conquistadores"
      break;
      case "Lo Barnechea":
        despachar= "La Dehesa"
      break;
    }
    this.selectOption(document.querySelector(`[data-txteditaroc="despachar"]`),despachar, true)
    this.selectOption(document.querySelector(`[data-txteditaroc="empresa"]`),this.obj.oc.EMPRESA, true)
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
  updateOc: function(ev,id){
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
      subTotal: ev.target.elements[`editarocsubtotal`].value,
      neto: ev.target.elements[`editarocneto`].value,
      tipoIva: "Iva",
      iva: ev.target.elements[`editarociva`].value,
      descuentoOc : ev.target.elements[`editarocdescuentopor`].value,
      descuento2: ev.target.elements[`editarocdescuentopes`].value,
      total : ev.target.elements[`editaroctotalfinal`].value,
      observaciones : ev.target.elements[`editarocobservaciones`].value,
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
    let count = document.querySelectorAll("[data-counteditarsubavtividad").length
    for(let i = 1; i <= count; i++){
      oc.subActividad.push(ev.target.elements[`editarsubactividad-${i}`].value)
    }

    let count1 = document.querySelectorAll("[data-editaroc]").length
    for(let i = 1; i <= count1; i++){
      if(ev.target.elements[`editaroccodigo-${i}`].value.length > 0){
        oc.ocpCodigo.push(ev.target.elements[`editaroccodigo-${i}`].value)
        oc.ocpDescripcion.push(ev.target.elements[`editarocdescripcion-${i}`].value)
        oc.ocpRocha.push(ev.target.elements[`editarocrocha-${i}`].value)
        oc.ocpObservaciones.push(ev.target.elements[`editarocobservaciones-${i}`].value)
        oc.ocpCantidad.push(ev.target.elements[`editaroccantidad-${i}`].value)
        oc.ocpPreciob.push(ev.target.elements[`editarocpreciob-${i}`].value)
        oc.ocpPreciou.push(ev.target.elements[`editarocpreciou-${i}`].value)
        oc.ocpPreciol.push(ev.target.elements[`editarocpreciol-${i}`].value)
        oc.ocpDescuento.push(ev.target.elements[`editarocdescuento-${i}`].value)
        oc.ocpTotal.push(ev.target.elements[`editaroctotal-${i}`].value)
      }
    }

    socket.emit('updateOc', oc, id, JSON.stringify( localStorage.getItem('token')), (n) => {

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

export default UpdateOcStore