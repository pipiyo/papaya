import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ServicioReclamoActions from '../actions/ServicioReclamoActions'
import ServicioReclamoStore from '../stores/ServicioReclamoStore'

import ServicioIndex from '../components/reclamo/servicio-reclamo'

@ReactMixin.decorate(Reflux.connect(ServicioReclamoStore, 'data'))
export default class ServicioReclamoRoutes extends React.Component {

  constructor() {
    super()
    this.state = {data:""}
  }

  addServicio(ev) {
    ev.preventDefault()
    let servicio = {
      "reclamo": ev.target.elements['reclamo'].value,
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
    ServicioReclamoActions.addServicio(servicio); 
  }
 

  render() {
      return (
        <ServicioIndex mensaje={this.state.data} addServicio={this.addServicio.bind(this)} />       
      )
  }

}



