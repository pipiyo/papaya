import React from 'react'
import Reflux from 'reflux'
import { browserHistory } from 'react-router'
import moment  from 'moment'

import IndicadorSubServicioActions from '../actions/IndicadorSubServicioActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}subServicio` )

let IndicadorSubServicioStore = Reflux.createStore({
  listenables: [IndicadorSubServicioActions],
  obj: { 

  },
  init: function() {

  },
  getInitialState: function() {
    return this.obj
  },
  renderSubServicio: function(){
    socket.emit('allProyectoSubServicio')
    socket.on('okAllProyectoSubServicio', (okSearchServicio) =>{
      console.log(okSearchServicio)
    })
  }
})

export default IndicadorSubServicioStore