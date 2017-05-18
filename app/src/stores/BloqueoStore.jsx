import React from 'react'

import Reflux from 'reflux'

import BloqueoActions from '../actions/BloqueoActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}bloqueo` )

let BloqueoStore = Reflux.createStore({
  listenables: [BloqueoActions],

  obj: {
    content: null,
    area: null,
    loading: true,
    checkArea: null,
    guardar: null
  },

  init: function() {

  },

  guardar: function() {

    let areas = document.getElementsByClassName('checkArea')
    let area = _.find(areas, function(a) { return a.checked == true })

    let items = document.getElementsByClassName('checkContent')
    //console.log(_.filter(items, function(i) { return i.checked == true }))
    let item = []
    _.forEach(_.filter(items, function(i) { return i.checked == true }), function(value, key) {
      item.push(value.value)
    })


    socket.emit('guardar', area.value, item, ( status ) => {

      alert( status )

    })


  },

  checkArea: function(e) {
    let x = document.getElementsByClassName('checkArea')
    for (let i = 0; i < x.length; i++) {
      if(x[i].value != e.target.value) x[i].checked = false
    }
    socket.emit('getAreaItem', e.target.value, ( area ) => {
            let cc = document.getElementsByClassName('checkContent')
            for (let o = 0; o < cc.length; o++) {
                 cc[o].checked = ( _.includes(area.items, cc[o].value) ) ? true : false
            }
      this.trigger(this.obj) 

    })
  },

  get: function() {

    socket.emit('get', ( content, area ) => {
      //console.log( content, area )

      this.obj.content = content
      this.obj.area = area
      this.obj.loading = false
      this.obj.checkArea = this.checkArea
      this.obj.guardar = this.guardar

      this.trigger(this.obj) 

    })

        
      

  },

  getInitialState: function() {
    return this.obj
  }


})

export default BloqueoStore