import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import DialogActions from '../actions/DialogActions'
import AddRochaActions from '../actions/AddRochaActions'


import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}proyecto` )

let AddRochaStore = Reflux.createStore({
  listenables: [AddRochaActions],
  obj: { 
    vendedor:'',
    disenador:'',
    cliente:'',
    linea: '',
    mensaje: {title:"",texto:"",estado:false},
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment()} },
  },
  completSelect: function() {
    socket.emit('completSelect', (n) => {
      this.obj.vendedor = n.vendedor
      this.obj.disenador = n.disenador
      this.obj.cliente = n.cliente
      this.obj.linea = n.linea
      this.trigger(this.obj)
    })
  },
  addRocha: function(ev){
    let numero =  document.getElementById('cliente').options.selectedIndex

    let proyecto = {
      codigo: ev.target.elements['codigo'].value,
      cliente: ev.target.elements['cliente'].options[numero].text,
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
      departamento: ev.target.elements['departamento'].value  
    }
    socket.emit('addRocha', proyecto, JSON.stringify( localStorage.getItem('token')), (n) => {
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
      ev.target.elements['departamento'].options[0].selected = "selected"
      ev.target.elements['ejecutivo'].options[0].selected = "selected"
      ev.target.elements['disenador'].options[0].selected = "selected"
      ev.target.elements['encargado'].options[0].selected = "selected"
      ev.target.elements['iva'].options[0].selected = "selected"
      ev.target.elements['cliente'].options[0].selected = "selected"
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
  renderRut: function(){
    let numero =  document.getElementById('cliente').options.selectedIndex
    document.getElementById('rut').value = document.getElementById('cliente').options[numero].value
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
  renderFechaInicio: function(fecha){
    this.obj.item.fecha.fechaInicio = fecha
    this.trigger(this.obj)
  },
  renderFechaEntrega: function(fecha){
    this.obj.item.fecha.fechaEntrega = fecha
    this.trigger(this.obj)
  }
})

export default AddRochaStore