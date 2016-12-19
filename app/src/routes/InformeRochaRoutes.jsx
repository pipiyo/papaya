import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DatePicker from 'react-datepicker'
import moment  from 'moment'

import InformeRochaActions from '../actions/InformeRochaActions'
import InformeRochaStore from '../stores/InformeRochaStore'

import InformeRochaIndex from '../components/informe-rocha'

@ReactMixin.decorate(Reflux.connect(InformeRochaStore, 'obj'))
export default class InformeRoutes extends React.Component {

  constructor() {
    super()
    this.state = {valor:200}
  }
  componentWillMount(){
    InformeRochaActions.renderReset()
    InformeRochaActions.allRocha(this.state.obj.filtro)
  }

  filtro(){
    let fechaI = document.getElementById("fechaInicio").value;
    let fechaE = document.getElementById("fechaEntrega").value;
    let codigo = document.getElementById("codigo").value;
    let estado = document.getElementById("estado").value;
    let vendedor = document.getElementById("vendedor").value;
    let cliente = document.getElementById("cliente").value;

    if(codigo != ""){this.state.obj.filtro.codigo=codigo}else{this.state.obj.filtro.codigo = ""}
    if(vendedor != ""){this.state.obj.filtro.vendedor=vendedor}else{this.state.obj.filtro.vendedor= ""}   
    if(cliente != ""){this.state.obj.filtro.cliente =  cliente }else{this.state.obj.filtro.cliente = ""}
    if(fechaI != ""){this.state.obj.filtro.fechai =  fechaI }else{this.state.obj.filtro.fechai = ""}
    if(fechaE != ""){this.state.obj.filtro.fechae =  fechaE }else{this.state.obj.filtro.fechae = ""}
    this.state.obj.filtro.estado = estado

    InformeRochaActions.allRocha(this.state.obj.filtro)
  }

  fechaInicioDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaInicio: date })
      this.filtro();
    }else{
      document.getElementById("fechaInicio").value = ""
      this.setState({ fechaInicio: undefined })
      this.filtro();
    }
  }

  fechaEntregaDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaEntrega: date })
      this.filtro();
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.setState({ fechaEntrega: undefined })
      this.filtro();
    }
  }

  viewMore(){
    this.setState({valor:this.state.valor + 100})
    this.state.obj.filtro.count = this.state.valor
    InformeRochaActions.allRocha(this.state.obj.filtro)
  }

  render() {  
      if(this.state.obj.rocha){
        return (
          <div>
            <InformeRochaIndex 
            rocha={this.state.obj.rocha.valor} 
            cuenta={this.state.obj.rocha.cuenta} 
            ejecutivo={this.state.obj.rocha.ejecutivo} 
            fechaInicio={this.state.fechaInicio} 
            fechaEntrega={this.state.fechaEntrega}  
            filtro={this.filtro.bind(this)} 
            viewMore={this.viewMore.bind(this)}
            fechaInicioDate={this.fechaInicioDate.bind(this)} 
            fechaEntregaDate={this.fechaEntregaDate.bind(this)}
            />  
          </div>  
        )
      }else{
        return (
          <div>
            <h1>Cargando</h1>
          </div>
        )
      }
  }

}
