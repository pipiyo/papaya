import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import InformeActions from '../actions/InformeActions'
import InformeStore from '../stores/InformeStore'

import InformeIndex from '../components/informe'

@ReactMixin.decorate(Reflux.connect(InformeStore, 'data'))
export default class InformeRoutes extends React.Component {

  constructor() {
    super()
    this.state = {view:100, sum:200, servicio:"", fecha: "", codigo : "", estado : 'proyecto.ESTADO IN ("EN PROCESO")', vendedor : "", categoria : "", cliente : ""}
  }
  componentWillMount(){
    this.setState({sum:200})
  	InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.view,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fecha,this.state.cliente);
  }
  componentWillReceiveProps(nextProps, nextState){
     this.setState({sum:200})
    InformeActions.viewInformes(this.servicio(nextProps.params.area),this.state.view,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fecha,this.state.cliente);
  }
  viewMore(){
    this.setState({sum:this.state.view + this.state.sum})
    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fecha,this.state.cliente);
  }
  servicio(servicio){
    switch (servicio) {
      case "abastecimiento":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones")'
          break;
      case "despacho":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Despacho")'
          break;
      case "sillas":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Sillas")'
          break;
      case "instalacion":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Instalacion")'
          break;
      case "produccion":
          this.state.servicio= 'NOMBRE_SERVICIO IN ("Produccion")'
          break;
      case "desarrollo":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Desarrollo")'
          break;
      case "planificacion":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas")'
          break;
      case "comercial":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas")'
          break;
      case "reclamo":
          this.state.servicio = 'reclamo'
          break;
    }
    return this.state.servicio
  }
  filtro(){
    let fechaI = document.getElementById("fechaInicio").value;
    let fechaE = document.getElementById("fechaEntrega").value;
    let codigo = document.getElementById("codigo").value;
    let estado = document.getElementById("estado").value;
    let vendedor = document.getElementById("vendedor").value;
    let categoria = document.getElementById("categoria").value;
    let cliente = document.getElementById("cliente").value;

    (codigo != "")?this.state.codigo = ' and proyecto.CODIGO_PROYECTO like "%'+ codigo +'%"':this.state.codigo = "";
    (vendedor != "")?this.state.vendedor = ' and proyecto.EJECUTIVO like "%'+ vendedor +'%"':this.state.vendedor = "";
    (categoria != "")?this.state.categoria = ' and servicio.CATEGORIA like "%'+ categoria +'%"':this.state.categoria = "";
    (cliente != "")?this.state.cliente = ' and proyecto.NOMBRE_CLIENTE like "%'+ cliente +'%"':this.state.cliente = "";
    (fechaI != "" && fechaE != "")?this.state.fecha = ' and proyecto.FECHA_CONFIRMACION BETWEEN "'+ fechaI +'" and "'+ fechaE +'"':this.state.fecha = "";

    this.state.estado = 'proyecto.ESTADO IN ("'+ estado +'")'

    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fecha,this.state.cliente);
  }

  render() {
    if(this.state.data){
      return (
        <div>
          <InformeIndex cuenta={this.state.data.cuenta} servicio={this.props.params.area} datos={this.state.data.valor} viewMore={this.viewMore.bind(this) } filtro={this.filtro.bind(this)} />  
        </div>  
      )
    }else{
      return (
      <div><h1>Cargando ...</h1></div>
      )
    }
  }

}
