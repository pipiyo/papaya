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
    socket.on('popupNotification', (n) => {
      console.log(n)
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
  },

/*
  getObj: function() {
    this.obj = { 
                  user: {
                          full_name: localStorage.getItem('full_name'),
                          profile_picture: localStorage.getItem('profile_picture'),
                          user_nav: null,
                          showUserNav: this.showUserNav
                        },
                  menu: [
							      {id:"11",img: "fa fa-bullhorn", name: "Planificación", icon: "icon planificacion", "item":[{id:"1",nombre:"Nueva Actividad",ruta:"/home/actividad/ingreso/nueva"},{id:"2",nombre:"Informe Planificación",ruta:"/home/informe/planificación"},{id:"3",nombre:"Sub Actividades",ruta:"/home/indicadores/planificación"}]},
							      {id:"1",img: "fa fa-rocket", name: "Rochas", icon: "icon rocha", "item": [{id:"1",nombre:"Informe Rochas",ruta:"/home/informe-rochas"}]},
							      {id:"3",img: "fa fa-shopping-cart", name: "Abastecimiento", icon: "icon abastecimiento" , "item":[{id:"1",nombre:"Informe Abastecimiento",ruta:"/home/informe/abastecimiento"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/abastecimiento"}]},
							      {id:"4",img: "fa fa-suitcase", name: "Comercial", icon: "icon comercial", "item":[{id:"1",nombre:"Informe Comercial",ruta:"/home/informe/comercial"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/comercial"}]},
							      {id:"5",img: "fa fa-pencil", name: "Dam" , icon: "icon dam", "item": false},
							      {id:"6",img: "fa fa-lightbulb-o", name: "Técnica", icon: "icon desarrollo", "item":[{id:"1",nombre:"Informe Técnica",ruta:"/home/informe/técnica"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/técnica"}]},
							      {id:"7",img: "fa fa-truck", name: "Despacho", icon: "icon despacho","item":[{id:"1",nombre:"Informe Despacho",ruta:"/home/informe/despacho"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/despacho"}]},
							      {id:"8",img: "fa fa-user", name: "Gerencia", icon: "icon gerencia", "item": false},
							      {id:"9",img: "fa fa-wrench", name: "Integración", icon: "icon integracion", "item": false},
							      {id:"10",img: "fa fa-wrench", name: "Instalaciones", icon: "icon instalaciones", "item":[{id:"1",nombre:"Informe Instalación",ruta:"/home/informe/instalación"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/instalación"}]},
							      {id:"12",img: "fa fa-fire-extinguisher", name: "Prevención", icon: "icon prevencion", "item": false},
							      {id:"13",img: "fa fa-cog", name: "Producción", icon: "icon produccion", "item":[{id:"1",nombre:"Informe Producción",ruta:"/home/informe/producción"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/producción"}]},
							      {id:"14",img: "fa fa-book", name: "Reclamos", icon: "icon reclamos", "item":[{id:"1",nombre:"Nuevo Reclamo",ruta:"/home/reclamo"},{id:"2",nombre:"Nueva Actividad Reclamo",ruta:"/home/actividad/ingreso/reclamo"},{id:"3",nombre:"Informe Reclamo",ruta:"/home/informe/reclamo"}]},
							      {id:"15",img: "fa fa-cog", name: "Sillas" , icon: "icon sillas", "item":[{id:"1",nombre:"Informe Sillas",ruta:"/home/informe/sillas"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/sillas"}]},
							      {id:"16",img: "fa fa-bolt", name: "Sistema" , icon: "icon sistema", "item": false}
							    ],
						active : 'active',
						navMovil: this.navMovil,
						subMenus: this.subMenus,
						showNotification: this.showNotification,
            activeMenu : this.activeMenu
                       }
  },
*/

  getInitialState: function() {
    return this.obj = { 
                  user: {
                          full_name: localStorage.getItem('full_name'),
                          profile_picture: localStorage.getItem('profile_picture'),
                          user_nav: null,
                          showUserNav: this.showUserNav
                        },
                  menu: [
                    {id:"11",img: "fa fa-bullhorn", name: "Planificación", icon: "icon planificacion", "item":[{id:"1",nombre:"Nueva Actividad",ruta:"/home/actividad/ingreso/nueva"},{id:"2",nombre:"Informe Planificación",ruta:"/home/informe/planificación"},{id:"3",nombre:"Sub Actividades",ruta:"/home/indicadores/planificación"}]},
                    {id:"1",img: "fa fa-rocket", name: "Rochas", icon: "icon rocha", "item": [{id:"1",nombre:"Informe Rochas",ruta:"/home/informe-rochas"}]},
                    {id:"3",img: "fa fa-shopping-cart", name: "Abastecimiento", icon: "icon abastecimiento" , "item":[{id:"1",nombre:"Informe Abastecimiento",ruta:"/home/informe/abastecimiento"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/abastecimiento"},{id:"3",nombre:"Bodega Insumo",ruta:"/home/bodega/insumo"}]},
                    {id:"4",img: "fa fa-suitcase", name: "Comercial", icon: "icon comercial", "item":[{id:"1",nombre:"Informe Comercial",ruta:"/home/informe/comercial"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/comercial"}]},
                    {id:"5",img: "fa fa-pencil", name: "Dam" , icon: "icon dam", "item": false},
                    {id:"6",img: "fa fa-lightbulb-o", name: "Técnica", icon: "icon desarrollo", "item":[{id:"1",nombre:"Informe Técnica",ruta:"/home/informe/técnica"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/técnica"}]},
                    {id:"7",img: "fa fa-truck", name: "Despacho", icon: "icon despacho","item":[{id:"1",nombre:"Informe Despacho",ruta:"/home/informe/despacho"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/despacho"},{id:"3",nombre:"Bodega Terminado",ruta:"/home/bodega/terminado"},{id:"4",nombre:"Bodega Importado",ruta:"/home/bodega/importado"}]},
                    {id:"8",img: "fa fa-user", name: "Gerencia", icon: "icon gerencia", "item": false},
                    {id:"9",img: "fa fa-wrench", name: "Integración", icon: "icon integracion", "item": false},
                    {id:"10",img: "fa fa-wrench", name: "Instalaciones", icon: "icon instalaciones", "item":[{id:"1",nombre:"Informe Instalación",ruta:"/home/informe/instalación"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/instalación"}]},
                    {id:"12",img: "fa fa-fire-extinguisher", name: "Prevención", icon: "icon prevencion", "item": false},
                    {id:"13",img: "fa fa-cog", name: "Producción", icon: "icon produccion", "item":[{id:"1",nombre:"Informe Producción",ruta:"/home/informe/producción"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/producción"}]},
                    {id:"14",img: "fa fa-book", name: "Reclamos", icon: "icon reclamos", "item":[{id:"1",nombre:"Nuevo Reclamo",ruta:"/home/reclamo"},{id:"2",nombre:"Nueva Actividad Reclamo",ruta:"/home/actividad/ingreso/reclamo"},{id:"3",nombre:"Informe Reclamo",ruta:"/home/informe/reclamo"}]},
                    {id:"15",img: "fa fa-cog", name: "Sillas" , icon: "icon sillas", "item":[{id:"1",nombre:"Informe Sillas",ruta:"/home/informe/sillas"},{id:"2",nombre:"Sub Actividades",ruta:"/home/indicadores/sillas"},{id:"3",nombre:"Bodega Sillas",ruta:"/home/bodega/sillas"}]},
                    {id:"16",img: "fa fa-bolt", name: "Sistema" , icon: "icon sistema", "item": false}
                  ],
            active : 'active',
            navMovil: this.navMovil,
            subMenus: this.subMenus,
            showNotification: this.showNotification,
            activeMenu : this.activeMenu,
            numberNotification: null

                    
                       }
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

      console.log(notifications)

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