import React from 'react'
import { Link } from 'react-router'

class ContentRocha extends React.Component {

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
          <div class="content-informe">
            {this.validador("Ejecutivo:",this.props.rocha.EJECUTIVO)}
            {this.validador("Encargado:",this.props.rocha.ENCARGADO)}
            {this.validador("Nombre Proyecto:",this.props.rocha.NOMBRE_PROYECTO)}
            {this.validador("Obra:",this.props.rocha.OBRA)}
            {this.validador("Fecha Ingreso:",this.props.rocha.FECHA_INGRESO,true)}
            {this.validador("Fecha Entrega:",this.props.rocha.FECHA_CONFIRMACION,true)}
          </div>  
      )

  }

}

export default ContentRocha