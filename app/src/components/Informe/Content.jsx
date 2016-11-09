import React from 'react'
import { Link } from 'react-router'

class Content extends React.Component {

  constructor() {
    super()
  }

  viewServicio(){
    let area;
    switch (this.props.datos.NOMBRE_SERVICIO) {
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
    return "item-actividades " + area
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
    (estado == "OK")? ok = "description-actividad ok" : ok = "description-actividad";
    return ok
  }

  render() {
      return (                
        <div class={this.viewServicio()}>
          <div class="title-actividad">
              <h4><Link to="/home/detalle-actividad">{this.props.datos.CODIGO_SERVICIO}</Link> - <a href="#"> {this.props.datos.CODIGO_PROYECTO + " / " + this.props.datos.DESCRIPCION }</a></h4> 
              <p><Link to="/home/detalle-actividad"><i class="fa fa-eye" aria-hidden="true"></i></Link></p>
              <p><Link to="/home/actualizar-actividad"><i class="fa fa-pencil" aria-hidden="true"></i></Link></p>
          </div>
          <div class={this.okEstado(this.props.datos.ESTADO)}>
              {this.validador("Descripción:",this.props.datos.DESCRIPCION)}
              {this.validador("Proceso:",this.props.datos.PROCESO)}
              {this.validador("Fecha Ingreso:",this.props.datos.FECHA_INGRESO,true)}
              {this.validador("Fecha Entrega:",this.props.datos.FECHA_ENTREGA,true)}
              {this.validador("Estado:",this.props.datos.ESTADO)}
              {this.validador("Supervisor:",this.props.datos.SUPERVISOR)}
              {this.validador("Dirección:",this.props.datos.DIRECCION)}
              {this.validador("TP:",this.props.datos.TP)}
              {this.validador("TO:",this.props.datos.TO)}
              {this.validador("OS:",this.props.datos.OS)}
              {this.validador("FI:",this.props.datos.FI)}
          </div>
        </div>
      )

  }

}

export default Content