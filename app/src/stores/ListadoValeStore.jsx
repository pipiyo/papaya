import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'
import Item from '../components/listado-vale/Item.jsx'

import ListadoValeActions from '../actions/ListadoValeActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}listadoVale` )

let ListadoValeStore = Reflux.createStore({
  listenables: [ListadoValeActions],
  obj: { 
    vale : "",
    ejecutivo: "",
    cuenta: 0,
    proveedor: "",
    button: "",
    renderItem: [],
    filtro:{fechaInicio:undefined,fechaEntrega: undefined, codigo: null, estado: "Pendiente", departamento: null, rocha: null, limit: 0, limitB:100}
  },
  renderReset: function(){
    this.obj.filtro.limit = 0
    this.obj.renderItem = []
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "Pendiente" 
    this.obj.filtro.rocha = null
    this.obj.filtro.departamento = null 
  },
  renderVale: function(){
    socket.emit('allVale',this.obj.filtro, (n) => {
      this.obj.vale= n.vale
      this.obj.cuenta = n.cuenta
      this.renderItem()
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      document.getElementById('btn-buscar').disabled = true
      setTimeout(function(){ 
        if(document.getElementById('btn-buscar')){document.getElementById('btn-buscar').disabled = false}
      }, 3000)
      
      let fechaI = document.getElementById("fechaInicio").value
      let fechaE = document.getElementById("fechaEntrega").value
      let codigo = document.getElementById("codigo").value
      let estado = document.getElementById("estado").value
      let rocha = document.getElementById("rocha").value
      let departamento = document.getElementById("departamento").value

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(departamento != ""){this.obj.filtro.departamento=departamento}else{this.obj.filtro.departamento= null}   
      if(rocha != ""){this.obj.filtro.rocha = rocha}else{this.obj.filtro.rocha = null}
      
      this.obj.filtro.estado = estado
      this.obj.renderItem = []
      this.obj.filtro.limit = 0
      socket.emit('allVale',this.obj.filtro, (n) => {
        this.obj.vale = n.vale
        this.obj.cuenta = n.cuenta
        this.renderItem()
        this.trigger(this.obj)
      })
  },
  renderFiltroFi : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaInicio = date
    }else{
      document.getElementById("fechaInicio").value = ""
      this.obj.filtro.fechaInicio = undefined
    }
    this.trigger(this.obj)
  },
  renderFiltroFe : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaEntrega = date
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.obj.filtro.fechaEntrega = undefined
    }
    this.trigger(this.obj)
  },
  renderViewMore: function(){
    this.obj.filtro.limit = this.obj.filtro.limit + 100
    this.renderVale()
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
  fechaActual: function(){
    let hoy = new Date()
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1;
    let yyyy = hoy.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 
    return yyyy+'-'+mm+'-'+dd
  },
  renderItem: function(){
    let i
    for(i=0;this.obj.vale.length > i ;i++){
      this.obj.renderItem.push(<Item fecha={this.fechaActual()} key={this.obj.vale[i].COD_VALE} datos={this.obj.vale[i]} />)
    } 
  }
})

export default ListadoValeStore