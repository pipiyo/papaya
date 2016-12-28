import React from 'react'
import Reflux from 'reflux'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}notification` )

let HomeStore = Reflux.createStore({
  obj: { notifications: null },

  getInitialState: function() {

    socket.emit('getNotification', (notifications) => {

      this.obj.notifications = notifications 

    })


    return this.obj
  }


})

export default HomeStore