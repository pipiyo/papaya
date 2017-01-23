import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DatePicker from 'react-datepicker'
import moment  from 'moment'

import InformeActions from '../actions/InformeActions'
import InformeStore from '../stores/InformeStore'

import InformeIndex from '../components/informe'

@ReactMixin.decorate(Reflux.connect(InformeStore, 'data'))
export default class InformeRoutes extends Component {

  constructor() {
    super()
    this.state = { 
                    view:100, 
                    sum:200, 
                    servicio:"", 
                    fechai: "",
                    fechae: "", 
                    codigo : "", 
                    estado : 'EN PROCESO', 
                    vendedor : "", 
                    categoria : "", 
                    cliente : "",
                    fechaInicio: undefined,
                    fechaEntrega:undefined
                  }
  }
  componentWillMount(){
    this.setState({sum:200})
  	InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.view,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fechai,this.state.cliente,this.state.fechae)
  }
  componentWillReceiveProps(nextProps, nextState){
     this.setState({sum:200})
    InformeActions.viewInformes(this.servicio(nextProps.params.area),this.state.view,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fechai,this.state.cliente,this.state.fechae)
  }
  viewMore(){
    this.setState({sum:this.state.view + this.state.sum})
    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fechai,this.state.cliente,this.state.fechae)
  }
  servicio(servicio){
    switch (servicio) {
      case "abastecimiento":
          this.state.servicio = '"Adquisiciones"'
          break;
      case "despacho":
          this.state.servicio = '"Despacho"'
          break;
      case "sillas":
          this.state.servicio = '"Sillas"'
          break;
      case "instalación":
          this.state.servicio = '"Instalacion"'
          break;
      case "producción":
          this.state.servicio= '"Produccion"'
          break;
      case "técnica":
          this.state.servicio = '"Desarrollo"'
          break;
      case "planificación":
          this.state.servicio = '"Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas","Planificacion"'
          break;
      case "comercial":
          this.state.servicio = '"Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas"'
          break;
      case "reclamo":
          this.state.servicio = 'reclamo'
          break;
    }
    return this.state.servicio
  }
  filtro(e,name){
    let fechaI = document.getElementById("fechaInicio").value
    let fechaE = document.getElementById("fechaEntrega").value
    let codigo = document.getElementById("codigo").value
    let estado = document.getElementById("estado").value
    let vendedor = document.getElementById("vendedor").value
    let categoria = document.getElementById("categoria").value
    let cliente = document.getElementById("cliente").value

    if(codigo != ""){this.state.codigo=codigo}else{this.state.codigo = ""}
    if(vendedor != ""){this.state.vendedor=vendedor}else{this.state.vendedor= ""}   
    if(categoria != ""){this.state.categoria = categoria}else{this.state.categoria = ""}
    if(cliente != ""){this.state.cliente =  cliente }else{this.state.cliente = ""}
    if(fechaI != ""){this.state.fechai =  fechaI }else{this.state.fechai = ""}
    if(fechaE != ""){this.state.fechae =  fechaE }else{this.state.fechae = ""}
    this.state.estado = estado

    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fechai,this.state.cliente,this.state.fechae);
  }

  fechaInicioDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaInicio: date })
      this.filtro()
    }else{
      document.getElementById("fechaInicio").value = ""
      this.setState({ fechaInicio: undefined })
      this.filtro()
    }
  }

  fechaEntregaDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaEntrega: date })
      this.filtro()
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.setState({ fechaEntrega: undefined })
      this.filtro()
    }
  }

  render() {
    if(this.state.data){
      return (
        <div>
          <InformeIndex 
            cuenta={this.state.data.cuenta} 
            servicio={this.props.params.area} 
            datos={this.state.data.valor} 
            ejecutivo={this.state.data.ejecutivo} 
            fechaInicio={this.state.fechaInicio} 
            fechaEntrega={this.state.fechaEntrega} 
            fechaInicioDate={this.fechaInicioDate.bind(this)} 
            fechaEntregaDate={this.fechaEntregaDate.bind(this)} 
            filtro={this.filtro.bind(this)} 
            viewMore={this.viewMore.bind(this)} 
          />  
        </div>  
      )
    }else{
      return (
      <div><h1>Cargando ...</h1></div>
      )
    }
  }

}
