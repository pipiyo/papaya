import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import SubActividad  from '../components/orden-compra/SubActividad'
import OcProductoItem from '../components/orden-compra/OcProductoItem'

import ordenCompraActions from '../actions/ordenCompraActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}emisionOc` )

let ordenCompraStore = Reflux.createStore({
  listenables: [ordenCompraActions],
  obj: { 
    numeroOC: '',
    sub:'',
    compSub:[],
    numSub:1,
    compOc:[],
    numOc:30,
    item: { fecha : { fechaInicio:moment(), fechaEntrega:moment()} }
  },
  completSelect: function() {
    socket.emit('completSelect', (n) => {
      this.obj.numeroOC = n.numeroOc[0].NUMEROOC
      this.obj.sub = n.sub
      this.obj.compSub.push(<SubActividad sub={this.obj.sub} num={this.obj.numSub} key={this.obj.numSub} />)

      let i
      for(i = 1; i <= this.obj.numOc; i++){
        this.obj.compOc.push(<OcProductoItem num={i} key={i} />)
      }
      this.trigger(this.obj)
      
    })
  },
  addSubActividad: function(){
    this.obj.numSub = this.obj.numSub + 1
    this.obj.compSub.push(<SubActividad sub={this.obj.sub} num={this.obj.numSub} key={this.obj.numSub} />)
    this.trigger(this.obj)
  },
  addRowOc: function(){
    this.obj.numOc = this.obj.numOc + 1
    this.obj.compOc.push(<OcProductoItem num={this.obj.numOc} key={this.obj.numOc} />)
    this.trigger(this.obj)
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

export default ordenCompraStore