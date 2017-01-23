import React, { Component } from 'react'
import { Link } from 'react-router'

class ContentRocha extends Component {

  constructor() {
    super()
  }

  validador(nombre,validador,fecha){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }
    else{
      text = <div class="opc"><h5>{nombre}</h5><p>{ (fecha)?validador.substring(0,10):validador}</p></div>
    }
    return text
  }

  render() {
      return (
        <div class="item-rocha-info">
            {this.validador("Ejecutivo:",this.props.datos.EJECUTIVO)}
            {this.validador("Obra:",this.props.datos.OBRA)}
            {this.validador("Fecha Ingreso:",this.props.datos.FECHA_INGRESO,true)}
            {this.validador("Fecha Entrega:",this.props.datos.FECHA_CONFIRMACION,true)}
        </div>
      )

  }

}

export default ContentRocha