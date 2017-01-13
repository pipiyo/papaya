import React from 'react'
import Reflux from 'reflux'
import moment  from 'moment'
import InformeRochaActions from '../actions/InformeRochaActions'
import Env from '../Config'
import io from 'socket.io-client'

import ContentRocha from '../components/informe-rocha/ContentRocha'

const socket = io.connect( `${Env.url}rocha` )

let InformeRochaStore = Reflux.createStore({
  listenables: [InformeRochaActions],
  obj: { 
    rocha: '',
    total: 0,
    ejecutivo: '',
    renderRochas: [], 
    filtro:{estado: "EN PROCESO", fechaInicio:undefined,fechaEntrega: undefined, vendedor : null, cliente : null,codigo:null,limitA:0, limitB: 100} 
  },
  renderReset: function(){
    this.obj.filtro.limitA = 0
    this.obj.renderRochas = []
    this.obj.filtro.fechaInicio = undefined
    this.obj.filtro.fechaEntrega = undefined
    this.obj.filtro.codigo = null
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = null
    this.obj.filtro.cliente = null 
  },
  allRocha: function(data){
  	socket.emit('allRocha',this.obj.filtro, (n) => {
      this.obj.rocha = n.valor
      this.obj.total = n.cuenta
      this.obj.ejecutivo = n.ejecutivo
      this.rederRochas()
      this.trigger(this.obj)
    })
  },
  renderFiltro : function(){
      let fechaI = document.getElementById("fechaInicio").value
      let fechaE = document.getElementById("fechaEntrega").value
      let codigo = document.getElementById("codigo").value
      let estado = document.getElementById("estado").value
      let vendedor = document.getElementById("vendedor").value
      let cliente = document.getElementById("cliente").value

      if(codigo != ""){this.obj.filtro.codigo=codigo}else{this.obj.filtro.codigo = null}
      if(vendedor != ""){this.obj.filtro.vendedor=vendedor}else{this.obj.filtro.vendedor= null}   
      if(cliente != ""){this.obj.filtro.cliente =  cliente }else{this.obj.filtro.cliente = null}
      
      this.obj.filtro.estado = estado
      this.obj.renderRochas = []
      this.obj.filtro.limitA = 0

      socket.emit('allRocha',this.obj.filtro, (n) => {
        this.obj.rocha = n.valor
        this.obj.total = n.cuenta
        this.obj.ejecutivo = n.ejecutivo
        this.rederRochas()
        this.trigger(this.obj)
      })
  },
  rederRochas: function(){
    let i
    for(i=0; i < this.obj.rocha.length; i++){
      (this.obj.rocha[i].FECHA_INGRESO != null)? this.obj.rocha[i].FECHA_INGRESO = this.obj.rocha[i].FECHA_INGRESO.substring(0,10) : this.obj.rocha[i].FECHA_INGRESO = "" ;
      (this.obj.rocha[i].FECHA_CONFIRMACION != null)? this.obj.rocha[i].FECHA_CONFIRMACION = this.obj.rocha[i].FECHA_CONFIRMACION.substring(0,10) : this.obj.rocha[i].FECHA_CONFIRMACION = "En Espera" ;
     
      this.obj.renderRochas.push(<ContentRocha key={this.obj.rocha[i].CODIGO_PROYECTO} rocha={this.obj.rocha[i]} />)
    }
  },
  renderFiltroFi : function(date){
    console.log("hola")
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaInicio = date
      this.renderFiltro()
    }else{
      document.getElementById("fechaInicio").value = ""
      this.obj.filtro.fechaInicio = undefined
      this.renderFiltro()
    }
  },
  renderFiltroFe : function(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.obj.filtro.fechaEntrega = date
      this.renderFiltro()
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.obj.filtro.fechaEntrega = undefined
      this.renderFiltro()
    }
  },
  renderViewMore: function(){
    this.obj.filtro.limitA = this.obj.filtro.limitA + 100
    this.allRocha()
  },
  renderButton: function(rows,sub){
    if(rows > sub){
      document.getElementById("view-more").classList.remove("hidden")
    }else{
      document.getElementById("view-more").classList.add("hidden")
    }
  },
  renderAtraso: function(fechaConfirmacion,codigo){
    if(this.fechaActual() > fechaConfirmacion){
      document.querySelector(`[data-proyecto="${codigo}"]`).classList.add("atrasado")
    }else{
      document.querySelector(`[data-proyecto="${codigo}"]`).classList.remove("ok")
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
  }
})

export default InformeRochaStore