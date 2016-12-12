import Reflux from 'reflux'
import HomeActions from '../actions/HomeActions'

let HomeStore = Reflux.createStore({
  listenables: [HomeActions],
  obj: { 
                      	user: {
                      			null,
                      			null
                      	},
                        menu: null,
						active : null,
						notification : null,
						navMovil: null,
						subMenus: null,
						navNotification: null
  },
  init: function() {
    this.getObj()
  },
  getObj: function() {
    this.obj = { 
                      	user: {
                      			full_name: localStorage.getItem('full_name'),
                      			profile_picture: localStorage.getItem('profile_picture')
                      	},
                        menu: [
							      {id:"11",img: "fa fa-bullhorn", name: "Planificación", icon: "icon planificacion", "item":[{id:"1",nombre:"Nueva Actividad",ruta:"/home/actividad/ingreso/nueva"},{id:"2",nombre:"Informe Planificación",ruta:"/home/informe/planificación"}]},
							      {id:"1",img: "fa fa-rocket", name: "Rochas", icon: "icon rocha", "item": [{id:"1",nombre:"Informe Rochas",ruta:"/home/informe-rochas"}]},
							      {id:"3",img: "fa fa-shopping-cart", name: "Abastecimiento", icon: "icon abastecimiento" , "item":[{id:"1",nombre:"Informe Abastecimiento",ruta:"/home/informe/abastecimiento"}]},
							      {id:"4",img: "fa fa-suitcase", name: "Comercial", icon: "icon comercial", "item":[{id:"1",nombre:"Informe Comercial",ruta:"/home/informe/comercial"}]},
							      {id:"5",img: "fa fa-pencil", name: "Dam" , icon: "icon dam", "item": false},
							      {id:"6",img: "fa fa-lightbulb-o", name: "Técnica", icon: "icon desarrollo", "item":[{id:"1",nombre:"Informe Técnica",ruta:"/home/informe/técnica"}]},
							      {id:"7",img: "fa fa-truck", name: "Despacho", icon: "icon despacho","item":[{id:"1",nombre:"Informe Despacho",ruta:"/home/informe/despacho"}]},
							      {id:"8",img: "fa fa-user", name: "Gerencia", icon: "icon gerencia", "item": false},
							      {id:"9",img: "fa fa-wrench", name: "Integración", icon: "icon integracion", "item": false},
							      {id:"10",img: "fa fa-wrench", name: "Instalaciones", icon: "icon instalaciones", "item":[{id:"1",nombre:"Informe Instalación",ruta:"/home/informe/instalación"}]},
							      {id:"12",img: "fa fa-fire-extinguisher", name: "Prevención", icon: "icon prevencion", "item": false},
							      {id:"13",img: "fa fa-cog", name: "Producción", icon: "icon produccion", "item":[{id:"1",nombre:"Informe Producción",ruta:"/home/informe/producción"}]},
							      {id:"14",img: "fa fa-book", name: "Reclamos", icon: "icon reclamos", "item":[{id:"1",nombre:"Nuevo Reclamo",ruta:"/home/reclamo"},{id:"2",nombre:"Nueva Actividad Reclamo",ruta:"/home/actividad/ingreso/reclamo"},{id:"3",nombre:"Informe Reclamo",ruta:"/home/informe/reclamo"}]},
							      {id:"15",img: "fa fa-cog", name: "Sillas" , icon: "icon sillas", "item":[{id:"1",nombre:"Informe Sillas",ruta:"/home/informe/sillas"}]},
							      {id:"16",img: "fa fa-bolt", name: "Sistema" , icon: "icon sistema", "item": false}
							    ],
						active : 'active',
						notification : null,
						navMovil: this.navMovil,
						subMenus: this.subMenus,
						navNotification: this.navNotification
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

  /* Agrega clase notificación active */
  navNotification: function(ev){
    ev.preventDefault();
    (this.obj.notification == null ) ? this.obj.notification = 'active' : this.obj.notification = null
  },

  /* Agrega clase active para desplegar sub-menus */
  subMenus: function(ev){
    ev.preventDefault()
    let x = document.querySelectorAll("[data-click]")
    let z = document.querySelectorAll("[data-active]")
    let valor = ev.currentTarget.getAttribute("data-click")
    z[valor].classList.toggle('active')
  }

})

export default HomeStore

