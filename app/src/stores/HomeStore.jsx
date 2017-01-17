import React from 'react'
import ReactDOM from 'react-dom' 
import Reflux from 'reflux'

import { browserHistory } from 'react-router'

import HomeActions from '../actions/HomeActions'
import Notification from '../components/home/Notification'
import User from '../components/home/User'
import NumberNotification from '../components/home/NumberNotification'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}home` )

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],
  obj: { 
          	user: null,
            menu: null,
						active : null,
						notification : null,
						navMovil: null,
						subMenus: null,
						showNotification: null,
            activeMenu: null,
            numberNotification: null
  },

  init: function() {
    this.getObj()
    socket.on('popupNotification', (n) => {
      if (n == 0) {
        this.obj.numberNotification = null
      }else{
        this.obj.numberNotification = <NumberNotification number={n} />
      }
      this.trigger( this.obj )
    })
    socket.emit('getNumberNotification', (n) => {
      if (n == 0) {
        this.obj.numberNotification = null
      }else{
        this.obj.numberNotification = <NumberNotification number={n} />
      }
      this.trigger( this.obj )
    })

    socket.emit('getAreas', (n) => {

      this.obj.menu = n
      this.trigger( this.obj )
    })

  },


  getObj: function() {
    return this.obj = { 
                  user: {
                          full_name: localStorage.getItem('full_name'),
                          profile_picture: localStorage.getItem('profile_picture'),
                          user_nav: null,
                          showUserNav: this.showUserNav
                        },
						active : 'active',
						navMovil: this.navMovil,
						subMenus: this.subMenus,
						showNotification: this.showNotification,
            activeMenu : this.activeMenu
                       }
  },


  getInitialState: function() {
    return this.obj
  },


  /* Agrega clase active para desplegar sub-menus */
  navMovil: function(ev){
    ev.preventDefault()
    let x = document.querySelectorAll(".nav-item")
    x[0].classList.toggle('active')
  },

  /* Agrega clase active para desplegar sub-menus */
  activeMenu : function(click){
    let i
    let x = document.querySelectorAll(`[data-subclick]`)
    for(i = 0; i < x.length; i++){
      x[i].classList.remove("ok")
    }
    document.getElementById(click.currentTarget.id).classList.add("ok")
  },
  subMenus: function(ev){
    ev.preventDefault()
    let x = document.querySelectorAll("[data-click]")
    let z = document.querySelectorAll("[data-active]")
    let valor = ev.currentTarget.getAttribute("data-click")
    z[valor].classList.toggle('active')
  },


  logout: function(){
    localStorage.clear()
    browserHistory.push('/')  
  },





  showUserNav: function(){
  HomeActions._showUserNav()
  },
  _showUserNav: function(){

    this.obj.user.user_nav = <User 
                                  hideUserNav={HomeActions.hideUserNav}
                                  logout={HomeActions.logout} />
    this.trigger( this.obj )
  },
  hideUserNav: function(click){

      let container
      try {
          container = ReactDOM.findDOMNode(this.refs.userNav).contains(click.target)
      }
      catch(err) {
          container = false
      }


    if (!container) {
      if ( !(click.target == document.getElementsByClassName('img-user')[0]) ) {
          this.obj.user.user_nav = null
          this.trigger( this.obj )
      }
    }

  },





  showNotification: function(){
	HomeActions._showNotification()
  },
  _showNotification: function(){

    socket.emit('getNotification', (notifications) => {

      this.obj.notification = <Notification 
                                            notifications={notifications}
                                            hideNotification={HomeActions.hideNotification} />

      this.obj.numberNotification = null

      this.trigger( this.obj )

    })


  },
  hideNotification: function(click){
      let container
      try {
          container = ReactDOM.findDOMNode(this.refs.notification).contains(click.target)
      }
      catch(err) {
          container = false
      }
  	if (!container) {
  		if ( !(click.target == document.getElementsByClassName('notificacion-user')[0] || click.target == document.getElementsByClassName('notificacion-num')[0]) ) {
			this.obj.notification = null
  		  	this.trigger( this.obj )
  		}
  	}
  }
})

export default HomeStore