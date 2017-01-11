import React from 'react'
import Reflux from 'reflux'
import InformeRochaActions from '../actions/InformeRochaActions'
import Env from '../Config'
import io from 'socket.io-client'

import ContentRocha from '../components/informe-rocha/ContentRocha'

const socket = io.connect( `${Env.url}rocha` )

let InformeRochaStore = Reflux.createStore({
  listenables: [InformeRochaActions],
  obj: { 
    rocha: '',
    renderRochas: [], 
    filtro:{estado: "EN PROCESO", fechai: "", fechae: "", vendedor : "", cliente : "",codigo:"",count:100} 
  },
  renderReset: function(){
    this.obj.filtro.fechai = ""
    this.obj.filtro.fechae = ""
    this.obj.filtro.codigo = ""
    this.obj.filtro.estado = "EN PROCESO" 
    this.obj.filtro.vendedor = ""
    this.obj.filtro.cliente = "" 
  },
  allRocha: function(data){
  	socket.emit('allRocha',this.obj.filtro, (n) => {
      this.obj.rocha = n.valor
      this.rederRochas()
      this.trigger(this.obj)
    })
  },
  rederRochas: function(){
    let i
    for(i=0; i < this.obj.rocha.length; i++){
      (this.obj.rocha[i].FECHA_INGRESO != null)? this.obj.rocha[i].FECHA_INGRESO = this.obj.rocha[i].FECHA_INGRESO.substring(0,10) : this.obj.rocha[i].FECHA_INGRESO = "" ;
      (this.obj.rocha[i].FECHA_CONFIRMACION != null)? this.obj.rocha[i].FECHA_CONFIRMACION = this.obj.rocha[i].FECHA_CONFIRMACION.substring(0,10) : this.obj.rocha[i].FECHA_CONFIRMACION = "En Espera" ;
     
      this.obj.renderRochas.push(<ContentRocha key={i} rocha={this.obj.rocha[i]} />)
    }
  }
})

export default InformeRochaStore