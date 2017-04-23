import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import ClonerRochaActions from '../actions/ClonerRochaActions'
import DialogActions from '../actions/DialogActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}proyecto` )

let ClonerRochaStore = Reflux.createStore({
  listenables: [ClonerRochaActions],
  obj: { 
    mensaje: {title:"",texto:"",estado:false},
    vendedor:'',
    disenador:'',
    cliente:'',
    linea: '',
    search: '',
    servicio:[], 
    fechaInicio:[],
    fechaEntrega:[],
    input: {codigo:null,
            cliente:null,
            rut:null,
            obra:null,
            direccionObra:null,
            puestos:null,
            nombreProyecto:null,
            linea:null,
            telefono:null,
            contacto:null,
            mail:null,
            ejecutivo:null,
            disenador:null,
            encargado:null,
            fechaInicio:null,
            fechaEntrega:null,
            subtotal:null,
            descuento:null,
            neto:null,
            descuento2:null,
            neto2:null,
            valoriva:null,
            total:null,
            iva:null,
            departamento:null,
            fechaConfirmacion:null,
            fechaActa:null,
            estado:null,
            oc:null,
            pago:null  
          },
  },
  searchRocha: function(id){
    socket.emit('searchRocha', id, (n) => {
      this.obj.search = n.rocha
      this.obj.servicio = n.servicio

      this.obj.fechaInicio= []
      this.obj.fechaEntrega = []

      this.obj.servicio.map( (servicio,i) => {
        this.obj.fechaInicio.push((moment(servicio.FECHA_INICIO).isValid())?moment(servicio.FECHA_INICIO):undefined)
        this.obj.fechaEntrega.push((moment(servicio.FECHA_ENTREGA).isValid())?moment(servicio.FECHA_ENTREGA):undefined)  
      })
      
      this.obj.input.codigo = this.validador(this.obj.search[0].CODIGO_PROYECTO)
      this.obj.input.cliente = this.validador(this.obj.search[0].NOMBRE_CLIENTE)
      this.obj.input.rut = this.validador(this.obj.search[0].RUT_CLIENTE)
      this.obj.input.obra = this.validador(this.obj.search[0].OBRA)
      this.obj.input.direccionObra = this.validador(this.obj.search[0].DIRECCION_FACTURACION)
      this.obj.input.puestos = this.validador(this.obj.search[0].PUESTOS)
      this.obj.input.nombreProyecto = this.validador(this.obj.search[0].NOMBRE_PROYECTO)
      this.obj.input.linea = this.validador(this.obj.search[0].DEPARTAMENTO_CREDITO)
      this.obj.input.telefono = this.validador(this.obj.search[0].TELEFONO)
      this.obj.input.contacto= this.validador(this.obj.search[0].CONTACTO)
      this.obj.input.mail= this.validador(this.obj.search[0].MAIL)
      this.obj.input.ejecutivo = this.validador(this.obj.search[0].EJECUTIVO)
      this.obj.input.disenador= this.validador(this.obj.search[0].DISENADOR)
      this.obj.input.encargado= this.validador(this.obj.search[0].ENCARGADO)
      this.obj.input.fechaInicio= moment(this.obj.search[0].FECHA_INGRESO)
      this.obj.input.fechaEntrega= moment(this.obj.search[0].FECHA_ENTREGA)
      this.obj.input.fechaActa= (moment(this.obj.search[0].FECHA_ACTA).isValid())?moment(this.obj.search[0].FECHA_ACTA):undefined
      this.obj.input.fechaConfirmacion= (moment(this.obj.search[0].FECHA_CONFIRMACION).isValid())?moment(this.obj.search[0].FECHA_CONFIRMACION):undefined
      this.obj.input.subtotal= this.validador(this.obj.search[0].SUB_TOTAL)
      this.obj.input.descuento= this.validador(this.obj.search[0].DESCUENTO)
      this.obj.input.neto= this.validador(this.obj.search[0].MONTO)
      this.obj.input.descuento2= this.validador(this.obj.search[0].DESCUENTO2)
      this.obj.input.neto2= this.validador(this.obj.search[0].MONTO2)
      this.obj.input.valoriva= this.validador(this.obj.search[0].IVA)
      this.obj.input.iva= this.validador(this.obj.search[0].TIPO_IVA)
      this.obj.input.total= this.validador(this.obj.search[0].TOTAL)
      this.obj.input.departamento= this.validador(this.obj.search[0].DEPARTAMENTO)
      this.obj.input.estado= this.validador(this.obj.search[0].ESTADO)
      this.obj.input.oc= this.validador(this.obj.search[0].ORDEN_CC)
      this.obj.input.pago= this.validador(this.obj.search[0].CONDICION_PAGO)
    })
    socket.emit('completSelect', (n) => {
      this.obj.vendedor = n.vendedor
      this.obj.disenador = n.disenador
      this.obj.cliente = n.cliente
      this.obj.linea = n.linea
      this.trigger(this.obj)
    })
  },
  completSelectTotal: function(){
    document.getElementById('descuento').value = this.obj.input.descuento 
    document.getElementById('subtotal').value = this.obj.input.subtotal
    document.getElementById('neto').value = this.obj.input.neto
    document.getElementById('descuento2').value = this.obj.input.descuento2
    document.getElementById('neto2').value = this.obj.input.neto2
    document.getElementById('valoriva').value = this.obj.input.valoriva
    document.getElementById('total').value = this.obj.input.total
  },
  completInput: function(){
    this.obj.servicio.map( (servicio,i) => {
      document.getElementById(`descripcion-${i}`).value = servicio.DESCRIPCION   
    })
  },
  clonerRocha: function(ev){
    let proyecto = {
      codigo: ev.target.elements['codigo'].value,
      cliente: ev.target.elements['cliente'].value,
      rut: ev.target.elements['rut'].value,
      obra: ev.target.elements['obra'].value,
      direccionObra: ev.target.elements['direccion-obra'].value,
      puestos: ev.target.elements['puestos'].value,
      nombreProyecto: ev.target.elements['nombre-proyecto'].value,
      linea: ev.target.elements['linea'].value,
      telefono: ev.target.elements['telefono'].value,
      contacto: ev.target.elements['contacto'].value,
      mail: ev.target.elements['mail'].value,
      ejecutivo: ev.target.elements['ejecutivo'].value,
      disenador: ev.target.elements['disenador'].value,
      encargado: ev.target.elements['encargado'].value,
      fechaInicio: ev.target.elements['fechaInicio'].value,
      fechaEntrega: ev.target.elements['fechaEntrega'].value,
      subtotal: ev.target.elements['subtotal'].value,
      descuento: ev.target.elements['descuento'].value,
      neto: ev.target.elements['neto'].value,
      descuento2: ev.target.elements['descuento2'].value,
      neto2: ev.target.elements['neto2'].value,
      valoriva: ev.target.elements['valoriva'].value,
      total: ev.target.elements['total'].value,
      iva: ev.target.elements['iva'].value,
      departamento: ev.target.elements['departamento'].value,
      oc: ev.target.elements['oc'].value,
      pago: ev.target.elements['pago'].value,
      servicio:[]
    }

    this.obj.servicio.map( (servicio,i) => {
        if(ev.target.elements[`check-servicio-${i}`]){
          if(ev.target.elements[`check-servicio-${i}`].checked){
            proyecto.servicio.push(servicio)
            proyecto.servicio[proyecto.servicio.length-1].FECHA_ENTREGA = ev.target.elements[`fechaEntrega-${i}`].value
            proyecto.servicio[proyecto.servicio.length-1].FECHA_INICIO = ev.target.elements[`fechaInicio-${i}`].value
            proyecto.servicio[proyecto.servicio.length-1].FECHA_PRIMERA_ENTREGA = ev.target.elements[`fechaEntrega-${i}`].value
            proyecto.servicio[proyecto.servicio.length-1].FECHA_REALIZACION = ev.target.elements[`fechaInicio-${i}`].value
            proyecto.servicio[proyecto.servicio.length-1].DESCRIPCION = ev.target.elements[`descripcion-${i}`].value
          } 
        }
    })

    socket.emit('clonerRocha',proyecto, JSON.stringify( localStorage.getItem('token')), (n) => {
      ev.target.elements['codigo'].value = ""
      ev.target.elements['rut'].value = ""
      ev.target.elements['obra'].value = ""
      ev.target.elements['direccion-obra'].value = ""
      ev.target.elements['puestos'].value = ""
      ev.target.elements['nombre-proyecto'].value = ""
      ev.target.elements['telefono'].value = ""
      ev.target.elements['contacto'].value = ""
      ev.target.elements['mail'].value = ""
      ev.target.elements['fechaInicio'].value = ""
      ev.target.elements['fechaEntrega'].value = ""
      ev.target.elements['subtotal'].value = ""
      ev.target.elements['descuento'].value = ""
      ev.target.elements['neto'].value = ""
      ev.target.elements['descuento2'].value = ""
      ev.target.elements['neto2'].value = ""
      ev.target.elements['valoriva'].value = ""
      ev.target.elements['total'].value = ""
      ev.target.elements['cliente'].value = ""
      ev.target.elements['departamento'].options[0].selected = "selected"
      ev.target.elements['ejecutivo'].options[0].selected = "selected"
      ev.target.elements['disenador'].options[0].selected = "selected"
      ev.target.elements['encargado'].options[0].selected = "selected"
      ev.target.elements['iva'].options[0].selected = "selected"
      ev.target.elements['linea'].options[0].selected = "selected"
      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */
      this.trigger(this.obj)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  formatNumber : function(numero){
    return numero.replace(/[^0-9.]/g,'')
  },
  renderTotal: function(ev){
    /* Neto */

    let descuento_total, descuento_total_2, descuento_total_3, descuento_total_4

    let subtotal = this.formatNumber(document.getElementById('subtotal').value)
    let descuento = this.formatNumber(document.getElementById('descuento').value)
    
    descuento_total = subtotal * descuento / 100
    descuento_total = Math.round(subtotal - descuento_total)

    document.getElementById('descuento').value = descuento
    document.getElementById('subtotal').value = subtotal
    document.getElementById('neto').value = descuento_total

    /* neto2 */

    let neto = this.formatNumber(document.getElementById('neto').value)
    let descuento2 = this.formatNumber(document.getElementById('descuento2').value)

    descuento_total_2 = neto * descuento2 / 100
    descuento_total_2 = Math.round(neto - descuento_total_2)

    document.getElementById('descuento2').value = descuento2
    document.getElementById('neto').value = neto
    document.getElementById('neto2').value = descuento_total_2

    /* Total */
    let neto2 = this.formatNumber(document.getElementById('neto2').value)
    let valoriva = document.getElementById('valoriva').value
    let iva  = document.getElementById('iva').selectedIndex

    if(iva == 1){
      descuento_total_3 =  Math.round(neto2 * 19 / 100)
      descuento_total_4 =  Math.round(parseInt(neto2) + parseInt(descuento_total_3))
      document.getElementById('valoriva').value = descuento_total_3
      document.getElementById('total').value = descuento_total_4
    } else if(iva == 2){
      descuento_total_3 =  Math.round(neto2 * 10 / 100)
      descuento_total_4 =  Math.round(parseInt(neto2) - parseInt(descuento_total_3))
      document.getElementById('valoriva').value = descuento_total_3
      document.getElementById('total').value = descuento_total_4
    } else if(iva == 3){
      descuento_total_3 =  0;
      descuento_total_4 =  Math.round(parseInt(descuento_total_3) + parseInt(neto2))
      document.getElementById('valoriva').value = descuento_total_3
      document.getElementById('total').value = descuento_total_4
    }

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
  renderFechaInicio: function(fecha){
    this.obj.input.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaInicioItem: function(fecha,valor){
    this.obj.fechaInicio[valor] = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.input.fechaEntrega = fecha
    this.trigger(this.obj)
  },
  renderFechaEntregaItem: function(fecha,valor){
    this.obj.fechaEntrega[valor] = fecha
    this.trigger(this.obj)
  },
  validador: function(validador){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }else{
      text = validador
    }
    return text
  },
  renderInput: function(id,valor){
    switch(id) {
      case "codigo":
       this.obj.input.codigo = this.validador(valor)
      break;
      case "rut":
        this.obj.input.rut = this.validador(valor)
      break;
      case "cliente":
        this.obj.input.cliente = this.validador(valor)
      break;
      case "obra":
        this.obj.input.obra = this.validador(valor)
      break;
      case "direccion-obra":
        this.obj.input.direccionObra = this.validador(valor)
      break;
      case "puestos":
        this.obj.input.puestos = this.validador(valor)
      break;
      case "nombre-proyecto":
        this.obj.input.nombreProyecto = this.validador(valor)
      break;
      case "telefono":
        this.obj.input.telefono = this.validador(valor)
      break;
      case "contacto":
        this.obj.input.contacto = this.validador(valor)
      break;
      case "mail":
        this.obj.input.mail = this.validador(valor)
      break;
      case "subtotal":
        this.obj.input.subtotal = this.validador(valor)
      break;
      case "descuento":
        this.obj.input.descuento = this.validador(valor)
      break;
      case "neto":
        this.obj.input.neto = this.validador(valor)
      break;
      case "descuento2":
        this.obj.input.descuento2 = this.validador(valor)
      break;
      case "neto2":
        this.obj.input.neto2 = this.validador(valor)
      break;
      case "valoriva":
        this.obj.input.valoriva = this.validador(valor)
      break;
      case "total":
        this.obj.input.total = this.validador(valor)
      break;
      case "oc":
        this.obj.input.oc = this.validador(valor)
      break;
      case "pago":
        this.obj.input.pago = this.validador(valor)
      break;
    }  
    this.trigger(this.obj)
  }
})

export default ClonerRochaStore