import React from 'react'

import Reflux from 'reflux'

import BloqueoActions from '../actions/BloqueoActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}bloqueo` )

let BloqueoStore = Reflux.createStore({
  listenables: [BloqueoActions],

  obj: {
    hola: `hola`
  },



  init: function() {

  },

  getObj: function() {




  },

  getInitialState: function() {



  }


})

export default BloqueoStore