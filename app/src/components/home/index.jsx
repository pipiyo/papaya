import React from 'react'

import Header from './Header'
import Main from './Main'

class Home extends React.Component {

  constructor() {
    super()
    this.state = { active : 'active', notification : null }
    this.menu = [
      {id:"1",img: <i className="fa fa-rocket" aria-hidden="true"></i>, name: "Rochas", icon: "icon rocha", "item": false},
      {id:"2",img: <i className="fa fa-coffee" aria-hidden="true"></i>, name: "Actividades", icon: "icon actividad", "item":[{id:"1",nombre:"Nueva Actividad",ruta:"/home/actividad"}]},
      {id:"3",img: <i className="fa fa-shopping-cart" aria-hidden="true"></i>, name: "Abastecimiento", icon: "icon abastecimiento" , "item":[{id:"1",nombre:"Informe Abastecimiento",ruta:"/home/abastecimiento"}]},
      {id:"4",img: <i className="fa fa-suitcase" aria-hidden="true"></i>, name: "Comercial", icon: "icon comercial", "item":[{id:"1",nombre:"Informe Comercial",ruta:"/home/comercial"}]},
      {id:"5",img: <i className="fa fa-pencil" aria-hidden="true"></i>, name: "Dam" , icon: "icon dam", "item": false},
      {id:"6",img: <i className="fa fa-lightbulb-o" aria-hidden="true"></i>, name: "Desarrollo", icon: "icon desarrollo", "item":[{id:"1",nombre:"Informe Técnica",ruta:"/home/tecnica"}]},
      {id:"7",img: <i className="fa fa-truck" aria-hidden="true"></i>, name: "Despacho", icon: "icon despacho","item":[{id:"1",nombre:"Informe Despacho",ruta:"/home/despacho"}]},
      {id:"8",img: <i className="fa fa-user" aria-hidden="true"></i>, name: "Gerencia", icon: "icon gerencia", "item": false},
      {id:"9",img: <i className="fa fa-wrench" aria-hidden="true"></i>, name: "Integración", icon: "icon integracion", "item": false},
      {id:"10",img: <i className="fa fa-wrench" aria-hidden="true"></i>, name: "Instalaciones", icon: "icon instalaciones", "item":[{id:"1",nombre:"Informe Instalación",ruta:"/home/instalacion"}]},
      {id:"11",img: <i class="fa fa-bullhorn" aria-hidden="true"></i>, name: "Planificación", icon: "icon planificacion", "item":[{id:"1",nombre:"Informe Planificación",ruta:"/home/planificacion"}]},
      {id:"12",img: <i className="fa fa-fire-extinguisher" aria-hidden="true"></i>, name: "Prevención", icon: "icon prevencion", "item": false},
      {id:"13",img: <i className="fa fa-cog" aria-hidden="true"></i>, name: "Producción", icon: "icon produccion", "item":[{id:"1",nombre:"Informe Producción",ruta:"/home/produccion"}]},
      {id:"14",img: <i className="fa fa-book" aria-hidden="true"></i>, name: "Reclamos", icon: "icon reclamos", "item":[{id:"1",nombre:"Nuevo Reclamo",ruta:"/home/reclamo"},{id:"2",nombre:"Nueva Actividad Reclamo",ruta:"/home/actividad-reclamo"},{id:"3",nombre:"Informe Reclamo",ruta:"/home/Informe-reclamo"}]},
      {id:"15",img: <i className="fa fa-cog" aria-hidden="true"></i>, name: "Sillas" , icon: "icon sillas", "item":[{id:"1",nombre:"Informe Sillas",ruta:"/home/sillas"}]},
      {id:"16",img: <i className="fa fa-bolt" aria-hidden="true"></i>, name: "Sistema" , icon: "icon sistema", "item": false},
    ]
  }
  /* Agrega clase active para desplegar sub-menus */
  navMovil(ev){
    ev.preventDefault()
    let x = document.querySelectorAll(".nav-item")
    x[0].classList.toggle('active')
  }

  /* Agrega clase notificación active */
  navNotification(ev){
    ev.preventDefault();
    (this.state.notification == null ) ? this.setState({notification:'active'}) : this.setState({notification:null});
  }

  /* Agrega clase active para desplegar sub-menus */
  subMenus(ev){
    ev.preventDefault()
    let x = document.querySelectorAll("[data-click]")
    let z = document.querySelectorAll("[data-active]")
    let valor = ev.currentTarget.getAttribute("data-click")
    z[valor].classList.toggle('active')
  }

  render() {

      return (
        <div className="frame">
          <Header menu={ this.menu } submenu={this.subMenus.bind(this)} navmovil={this.navMovil.bind(this)} />
          <Main notification={this.state.notification} navnotification={this.navNotification.bind(this)} content={this.props.content}/>
        </div>
      )

  }

}

export default Home