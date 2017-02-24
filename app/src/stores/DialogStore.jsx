import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import DialogActions from '../actions/DialogActions'
import Env from '../Config'
import io from 'socket.io-client'

let DialogStore = Reflux.createStore({
  listenables: [DialogActions],
  obj: { 
    mensaje: {title:"",texto:"",estado:false}
  },
  getInitialState: function() {
    return this.obj
  },
  dialog: function(data){
    this.obj.mensaje.texto = data.texto
    this.obj.mensaje.title = data.title
    this.obj.mensaje.estado = data.estado
    this.trigger(this.obj)
  },
  closeDialog : function(){
    this.obj.mensaje.texto = ''
    this.obj.mensaje.title = ''
    this.obj.mensaje.estado = false
    this.trigger(this.obj)
  }
})

export default DialogStore