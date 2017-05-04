import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-Linea/Item.jsx'

import ListadoLineaActions from '../actions/ListadoLineaActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoLinea` )

let ListadoLineaStore = Reflux.createStore({
  listenables: [ListadoLineaActions],
  obj: { 
    Linea : "",
    ejecutivo: "",
    cuenta: 0,
    button: "",
    renderItem: [],
    filtro:{linea: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.linea = null 
  },
  renderLinea: function(){
    socket.emit('allLinea',this.obj.filtro, (n) => {
      this.obj.linea = n.linea
      this.obj.cuenta = n.cuenta
      this.renderItem()
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        if(document.getElementById('btn-buscar')){document.getElementById('btn-buscar').disabled = false}
      }, 1000)


      let linea = document.getElementById("linea").value

      if(linea != ""){this.obj.filtro.linea=linea}else{this.obj.filtro.linea = null}

      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allLinea',this.obj.filtro, (n) => {
        this.obj.linea = n.linea
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderLinea()
  },
  renderButton: function(rows,sub){
    if(document.getElementById("btn-view")){
      if(rows > sub){
        document.getElementById("btn-view").classList.remove("hidden")
      }else{
        document.getElementById("btn-view").classList.add("hidden")
      }
    }
  },
  renderItem: function(){
    let i
    for(i=0;this.obj.linea.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.linea[i].CODIGO_LINEA} datos={this.obj.linea[i]} />)
    } 
  }
})

export default ListadoLineaStore