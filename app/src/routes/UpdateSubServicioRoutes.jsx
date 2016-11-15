import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import SubServicioActions from '../actions/SubServicioActions'
import SubServicioStore from '../stores/SubServicioStore'

import ServicioIndex from '../components/update-sub-servicio'

import ItemProduccion from '../components/update-sub-servicio/ItemProduccion.jsx'
import ItemSillas from '../components/update-sub-servicio/ItemSillas.jsx'
import ItemInstalacion from '../components/update-sub-servicio/ItemInstalacion.jsx'
import ItemDespacho from '../components/update-sub-servicio/ItemDespacho.jsx'

@ReactMixin.decorate(Reflux.connect(SubServicioStore, 'obj'))
export default class UpdateSubServicioRoutes extends React.Component {

  constructor() {
    super()
    this.state = {area: ""}
  }

  componentWillMount(){
    SubServicioActions.searchSubServicio(this.props.params.id);
    SubServicioActions.formTrigger()
  }

  formArea(area) {
     switch(area) {
      case "Produccion":
        this.state.area = <ItemProduccion datos={this.state.obj.search} /> 
      break;
      case "Instalacion":
        this.state.area = <ItemInstalacion datos={this.state.obj.search} />
      break;
      case "Sillas":
        this.state.area = <ItemSillas datos={this.state.obj.search} />
      break;
      case "Despacho":
        this.state.area = <ItemDespacho datos={this.state.obj.search} />
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
    let ruta = "/home/detalle-actividad/"+this.state.obj.search[0].SUB_CODIGO_SERVICIO
    SubServicioActions.updateSubServicio(servicio,ruta); 
  }
 

  render() {
      if(this.state.obj.search) {
        this.formArea(this.state.obj.search[0].SUB_NOMBRE_SERVICIO)
      return (
        <ServicioIndex datos={this.state.obj.search} tipo={this.props.params.tipo} area={this.state.area} updateServicio={this.updateServicio.bind(this)} />       
      )
      }else{
        return (
          <div><h1>Cargando</h1></div>     
        )
      }
  }

}


