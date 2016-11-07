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
    this.state = {view:100, sum:200, servicio:""}
  }
  componentWillMount(){
    this.setState({sum:200})
  	InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.view);
  }
  componentWillReceiveProps(nextProps, nextState){
     this.setState({sum:200})
    InformeActions.viewInformes(this.servicio(nextProps.params.area),this.state.view);
  }
  viewMore(){
    this.setState({sum:this.state.view + this.state.sum})
    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum);
  }
  servicio(servicio){
    switch (servicio) {
      case "abastecimiento":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones")'
          break;
      case "despacho":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Despacho")'
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
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion")'
          break;
      case "comercial":
          this.state.servicio = 'NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion")'
          break;
    }
    return this.state.servicio
  }

  render() {
    if(this.state.data){
      return (
        <div>
          <InformeIndex servicio={this.props.params.area} datos={this.state.data} viewMore={this.viewMore.bind(this)} />  
        </div>  
      )
    }else{
      return (
      <div><h1>Cargando ...</h1></div>
      )
    }
  }

}
