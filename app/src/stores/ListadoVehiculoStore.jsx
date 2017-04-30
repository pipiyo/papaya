import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-vehiculo/Item.jsx'

import ListadoVehiculoActions from '../actions/ListadoVehiculoActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoVehiculo` )

let ListadoVehiculoStore = Reflux.createStore({
  listenables: [ListadoVehiculoActions],
  obj: { 
    vehiculo : "",
    ejecutivo: "",
    cuenta: 0,
    button: "",
    renderItem: [],
    filtro:{vehiculo: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.vehiculo = null 
  },
  renderVehiculo: function(){
    socket.emit('allVehiculo',this.obj.filtro, (n) => {
      this.obj.vehiculo = n.vehiculo
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


      let vehiculo = document.getElementById("vehiculo").value

      if(vehiculo != ""){this.obj.filtro.vehiculo=vehiculo}else{this.obj.filtro.vehiculo = null}

      this.obj.renderItem = []
      this.obj.filtro.limit = 0

      socket.emit('allVehiculo',this.obj.filtro, (n) => {
        this.obj.vehiculo = n.vehiculo
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderVehiculo()
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
    for(i=0;this.obj.vehiculo.length > i ;i++){
      this.obj.renderItem.push(<Item key={this.obj.vehiculo[i].ID} datos={this.obj.vehiculo[i]} />)
    } 
  }
})

export default ListadoVehiculoStore