import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateServicioActions from '../actions/UpdateServicioActions'
import UpdateServicioStore from '../stores/UpdateServicioStore'

import ServicioIndex from '../components/update-servicio'
import ItemProduccion from '../components/update-servicio/ItemProduccion.jsx'
import ItemSillas from '../components/update-servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/update-servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/update-servicio/ItemDespacho.jsx'

@ReactMixin.decorate(Reflux.connect(UpdateServicioStore, 'obj'))
export default class UpdateServicioRoutes extends React.Component {

  constructor() {
    super()
    this.state = {area: ""}
  }

  componentWillMount(){
    UpdateServicioActions.formTrigger()
    UpdateServicioActions.searchServicio(this.props.params.id);
  }

  formArea(area) {
     switch(area) {
      case "Produccion":
        this.state.area = <ItemProduccion datos={this.state.obj.servicio} /> 
      break;
      case "Instalacion":
        this.state.area = <ItemInstalacion comunas={this.state.obj.comunas} datos={this.state.obj.servicio} />
      break;
      case "Sillas":
        this.state.area = <ItemSillas comunas={this.state.obj.comunas} datos={this.state.obj.servicio} />
      break;
      case "Despacho":
        this.state.area = <ItemDespacho vehiculos={this.state.obj.vehiculos} comunas={this.state.obj.comunas} datos={this.state.obj.servicio} />
      break;
      default:
        this.state.area = ""
    }
  }

  updateServicio(ev) {
    ev.preventDefault()
    let servicio = {
      "categoria": ev.target.elements['categoria'].value,
      "estado": ev.target.elements['estado'].value,
      "supervisor": ev.target.elements['supervisor'].value,
      "fechaInicio": ev.target.elements['fechaInicio'].value,
      "fechaEntrega": ev.target.elements['fechaEntrega'].value,  
      "dias": ev.target.elements['dias'].value,
      "descripcion": ev.target.elements['descripcion'].value ,
      "observacion": ev.target.elements['observacion'].value,
      "numero": ev.target.elements['numero'].value,
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
    UpdateServicioActions.updateServicio(servicio); 
  }
 

  render() {   
      if(this.state.obj.servicio) {
        this.formArea(this.state.obj.servicio[0].NOMBRE_SERVICIO)
      return (
        <ServicioIndex datos={this.state.obj.servicio} tipo={this.props.params.tipo} area={this.state.area} updateServicio={this.updateServicio.bind(this)} />       
      )
      }else{
        return (
          <div><h1>Cargando</h1></div>     
        )
      }
  }

}


