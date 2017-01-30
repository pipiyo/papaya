import React from 'react'
import { Link } from 'react-router'

import InformeRochaActions from '../../actions/InformeRochaActions'

class ContentRocha extends React.Component {
  constructor() {
    super()
  }
  componentDidMount(nextProps){
    InformeRochaActions.renderAtraso(this.props.rocha.FECHA_CONFIRMACION,this.props.rocha.CODIGO_PROYECTO)
  }
  render() {
      return (
        <div class="item">
          <div class="title-informe">
            <h3 data-proyecto={this.props.rocha.CODIGO_PROYECTO}>{this.props.rocha.CODIGO_PROYECTO} - {this.props.rocha.NOMBRE_CLIENTE} </h3>
            <Link class="icon-informe" to={`/home/actividad/${this.props.rocha.CODIGO_PROYECTO}/nueva`}> <i class="fa fa-plus" aria-hidden="true"></i> </Link>
            <Link class="icon-informe a" to={`/home/actividad/${this.props.rocha.CODIGO_PROYECTO}/nueva`}> <i class="fa fa-eye" aria-hidden="true"></i> </Link>
          </div>
          <div class="content-informe">
            <div class="opc"><h5>Obra</h5><p>{this.props.rocha.OBRA}</p></div>
            <div class="opc"><h5>Ejecutivo</h5><p>{this.props.rocha.EJECUTIVO}</p></div>
            <div class="opc"><h5>Fecha Ingreso</h5><p>{this.props.rocha.FECHA_INGRESO}</p></div>
            <div class="opc"><h5>Fecha Confirmación</h5><p>{this.props.rocha.FECHA_CONFIRMACION}</p></div>
          </div>
        </div>  
      )
  }

}

export default ContentRocha