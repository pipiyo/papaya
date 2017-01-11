import React from 'react'
import { Link } from 'react-router'

class ContentRocha extends React.Component {
  constructor() {
    super()
  }
  render() {
      return (
        <div class="item">
          <div class="title-informe">
            <h3 class="">{this.props.rocha.CODIGO_PROYECTO} - {this.props.rocha.NOMBRE_CLIENTE} </h3>
            <a href="" class="icon-informe"> <i class="fa fa-plus" aria-hidden="true"></i> </a>
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