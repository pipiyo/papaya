import React from 'react'
import { Link } from 'react-router'

class ContentRocha extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="item-rocha-info">
            <div class="opc">
                <h5>Ejecutivo:</h5>
                <p>{this.props.datos.EJECUTIVO}</p>
            </div>
            <div class="opc">
                <h5>Obra:</h5>
                <p>{this.props.datos.OBRA}</p>
            </div>
            <div class="opc">
                <h5>Fecha Ingreso:</h5>
                <p>{this.props.datos.FECHA_INGRESO.substring(0,10)}</p>
            </div>
            <div class="opc">
                <h5>Fecha entrega:</h5>
                <p>{this.props.datos.FECHA_CONFIRMACION.substring(0,10)}</p>
            </div>
        </div>
      )

  }

}

export default ContentRocha