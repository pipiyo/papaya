import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioActions from '../actions/ServicioActions'
import ServicioStore from '../stores/ServicioStore'

import ServicioIndex from '../components/servicio'
import ItemProduccion from '../components/servicio/ItemProduccion.jsx'
import ItemSillas from '../components/servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/servicio/ItemDespacho.jsx'

@ReactMixin.decorate(Reflux.connect(ServicioStore, 'data'))
export default class ServicioRoutes extends React.Component {

  constructor() {
    super()
    this.state = {data:"", area: ""}
  }

  formArea(ev) {
     switch(ev.target.value) {
      case "Produccion":
        this.setState({area:<ItemProduccion />}) 
      break;
      case "Instalacion":
        this.setState({area:<ItemInstalacion />}) 
      break;
      case "Sillas":
        this.setState({area:<ItemSillas />}) 
      break;
      case "Despacho":
        this.setState({area:<ItemDespacho />}) 
      break;
      default:
        this.setState({area:""}) 
    }
  }

  addServicio(ev) {
    ev.preventDefault()
    let servicio = {
      "reclamo": (ev.target.elements['reclamo']) ? ev.target.elements['reclamo'].value : "",
      "area": ev.target.elements['area'].value,
      "categoria": ev.target.elements['categoria'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": ev.target.elements['dias'].value,
      "descripcion": ev.target.elements['descripcion'].value ,
      "observacion": ev.target.elements['observacion'].value,
      "rocha": ev.target.elements['rocha'].value,
      "direccion" : (ev.target.elements['direccion']) ? ev.target.elements['direccion'].value : "",
      "guia" : (ev.target.elements['guia'] ) ? ev.target.elements['guia'].value : "",
      "comuna" : (ev.target.elements['comuna']) ? ev.target.elements['comuna'].value : "",
      "m3" : (ev.target.elements['m3']) ? ev.target.elements['m3'].value : "",
      "fi" : (ev.target.elements['fi']) ? ev.target.elements['fi'].value : "",
      "tm" : (ev.target.elements['tm']) ? ev.target.elements['tm'].value : "",
      "to" : (ev.target.elements['to']) ? ev.target.elements['to'].value : "",
      "os" : (ev.target.elements['os']) ? ev.target.elements['os'].value : "",
      "lider" : (ev.target.elements['lider']) ? ev.target.elements['lider'].value : "",  
      "puestos" : (ev.target.elements['puestos']) ? ev.target.elements['puestos'].value : "",   
      "instalador1" : (ev.target.elements['instalador1']) ? ev.target.elements['instalador1'].value : "",
      "instalador2" : (ev.target.elements['instalador2']) ? ev.target.elements['instalador2'].value : "",  
      "instalador3" : (ev.target.elements['instalador3']) ? ev.target.elements['instalador3'].value : "",   
      "proceso" : (ev.target.elements['proceso']) ? ev.target.elements['proceso'].value : "",  
      "vale" : (ev.target.elements['vale']) ? ev.target.elements['vale'].value : "",
      "ejecutor" : (ev.target.elements['ejecutor']) ? ev.target.elements['ejecutor'].value : "", 
      "vehiculo" : (ev.target.elements['vehiculo']) ? ev.target.elements['vehiculo'].value : "", 
      "cantidad" : (ev.target.elements['cantidad']) ? ev.target.elements['cantidad'].value : ""          
    }
    ServicioActions.addServicio(servicio);

    if(ev.target.elements['area']){ev.target.elements['area'].options[0].selected = "selected"}
    if(ev.target.elements['categoria']){ev.target.elements['categoria'].options[0].selected = "selected"}
    if(ev.target.elements['fechaInicio']){ev.target.elements['fechaInicio'].value = ""}
    if(ev.target.elements['fechaEntrega']){ev.target.elements['fechaEntrega'].value = ""}
    if(ev.target.elements['supervisor']){ev.target.elements['supervisor'].value = ""}
    if(ev.target.elements['descripcion']){ev.target.elements['descripcion'].value = ""}
    if(ev.target.elements['observacion']){ev.target.elements['observacion'].value = ""}
    if(ev.target.elements['dias']){ev.target.elements['dias'].value = ""}
    this.setState({area:""})   
  }
 

  render() {
      return (
        <ServicioIndex tipo={this.props.params.tipo} mensaje={this.state.data} area={this.state.area} addServicio={this.addServicio.bind(this)} formArea={this.formArea.bind(this)} />       
      )
  }

}


