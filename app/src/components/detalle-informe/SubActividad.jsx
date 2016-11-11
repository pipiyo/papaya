import React from 'react'
import { Link } from 'react-router'

class SubActividad extends React.Component {

  constructor() {
    super()
  }

  viewServicio(){
    let area;
    switch (this.props.datos.SUB_NOMBRE_SERVICIO) {
    case "Adquisiciones":
        area = "abastecimiento";
        break;
    case "Despacho":
        area = "despacho";
        break;
    case "Instalacion":
        area = "instalaciones";
        break;
    case "Produccion":
        area = "produccion";
        break;
    case "Desarrollo":
        area = "desarrollo";
        break;
    case "Sillas":
        area = "sillas";
        break;
    }
    return "item-actividades sub " + area
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

  okEstado(estado){
    let ok
    (estado == "OK")? ok = "description-actividad sub ok " : ok = "description-actividad sub";
    return ok
  }

  render() {
      return (
          <div class={this.viewServicio()}>
            <div class="title-actividad">
              <h4>{this.props.datos.CODIGO_PROYECTO} -  {this.props.datos.CODIGO_SUBSERVICIO}</h4> 
              <p><Link to="/home/detalle-actividad/actualizar-actividad"><i class="fa fa-pencil" aria-hidden="true"></i></Link></p>
            </div>
            <div class={this.okEstado(this.props.datos.SUB_ESTADO)}>
              {this.validador("Descripción:",this.props.datos.SUB_DESCRIPCION)}
              {this.validador("Proceso:",this.props.datos.SUB_PROCESO)}
              {this.validador("Fecha Ingreso:",this.props.datos.SUB_FECHA_INGRESO,true)}
              {this.validador("Fecha Entrega:",this.props.datos.SUB_FECHA_ENTREGA,true)}
              {this.validador("Estado:",this.props.datos.SUB_ESTADO)}
              {this.validador("Supervisor:",this.props.datos.SUB_SUPERVISOR)}
              {this.validador("Dirección:",this.props.datos.SUB_DIRECCION)}
              {this.validador("TP:",this.props.datos.SUB_TP)}
              {this.validador("TO:",this.props.datos.SUB_TO)}
              {this.validador("OS:",this.props.datos.SUB_OS)}
              {this.validador("FI:",this.props.datos.SUB_FI)}
            </div>
          </div>
      )

  }

}

export default SubActividad