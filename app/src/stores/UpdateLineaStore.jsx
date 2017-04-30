import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import UpdateLineaActions from '../actions/UpdateLineaActions'
import Env from '../Config'
import io from 'socket.io-client'
import chileanRut from 'chilean-rut'
import DialogActions from '../actions/DialogActions'
import moment  from 'moment'

const socket = io.connect( `${Env.url}linea` )

let UpdateLineaStore = Reflux.createStore({
  listenables: [UpdateLineaActions],
  obj: { 
    search: '',
    id: '',
    input: {codigo: "", nombre: "", activo: ""},
    mensaje: {title:"",texto:"",estado:false},
  },
  getInitialState: function() {
    return this.obj
  },
  updateLinea: function(ev){
    let Linea = {
      "codigo": this.obj.id,
      "nombre": ev.target.elements['nombre'].value,
      "activo": ev.target.elements['activo'].value
    }
    socket.emit('updateLinea', Linea, (n) => {

      /* Dialog */
      this.obj.mensaje.texto = n.mensaje
      this.obj.mensaje.title = 'Felicitaciones'
      this.obj.mensaje.estado = true
      setTimeout(this.closeDialog, 8000)
      DialogActions.dialog(this.obj.mensaje)
      /* End Dialog */

      browserHistory.push(`/home/listado-linea`)
    })
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
    DialogActions.dialog(this.obj.mensaje)
  },
  searchLinea: function(id){
    socket.emit('searchLinea', id, (n) => {
      this.obj.search = n.linea
      this.obj.id = id
      this.obj.input.nombre = this.validador(this.obj.search[0].NOMBRE_LINEA)
      this.obj.input.activo = this.obj.search[0].INHABILITAR
      this.trigger(this.obj)
    })
  },
  renderInput: function(id,valor){
    switch(id) {
      case "nombre":
       this.obj.input.nombre = this.validador(valor)
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

export default UpdateLineaStore