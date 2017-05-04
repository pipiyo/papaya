import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-reclamo/Item.jsx'

import ListadoReclamoActions from '../actions/ListadoReclamoActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoReclamo` )

let ListadoReclamoStore = Reflux.createStore({
  listenables: [ListadoReclamoActions],
  obj: { 
    cliente : "",
    ejecutivo: "",
    cuenta: 0,
    button: "",
    renderItem: [],
    filtro:{estado:"En Proceso",reclamo: null,rocha: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.rocha = null
    this.obj.filtro.reclamo = null 
  },
  renderReclamo: function(){
    socket.emit('allReclamo',this.obj.filtro, (n) => {
      this.obj.reclamo = n.reclamo
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

      let reclamo = document.getElementById("reclamo").value
      let rocha = document.getElementById("rocha").value
      let estado = document.getElementById("estado").value

      if(reclamo != ""){this.obj.filtro.reclamo=reclamo}else{this.obj.filtro.reclamo = null}
      if(rocha != ""){this.obj.filtro.rocha=rocha}else{this.obj.filtro.rocha = null}
      this.obj.filtro.estado = estado

      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allReclamo',this.obj.filtro, (n) => {
        this.obj.reclamo= n.reclamo
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderReclamo()
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
    for(i=0;this.obj.reclamo.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.reclamo[i].CODIGO_RECLAMO} datos={this.obj.reclamo[i]} />)
    } 
  }
})

export default ListadoReclamoStore