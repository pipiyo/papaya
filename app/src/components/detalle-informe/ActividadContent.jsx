import React from 'react'

class ActividadContent extends React.Component {

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
          {this.validador("Area:",this.props.datos.servicio[0].NOMBRE_SERVICIO)}
          {this.validador("Estado:",this.props.datos.servicio[0].ESTADO)}
          {this.validador("Fecha inicio:",this.props.datos.servicio[0].FECHA_INICIO,true)}
          {this.validador("Fecha entrega:",this.props.datos.servicio[0].FECHA_ENTREGA,true)}
        </div>
      )

  }

}

export default ActividadContent