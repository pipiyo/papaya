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
    }
    return "item-actividades " + area
  }

  render() {
      return (                
        <div class={this.viewServicio()}>
          <div class="title-actividad">
              <h4><Link to="/home/detalle-actividad">{this.props.datos.CODIGO_SERVICIO}</Link> - <a href="#"> {this.props.datos.CODIGO_PROYECTO} </a></h4> 
              <p><Link to="/home/detalle-actividad"><i class="fa fa-eye" aria-hidden="true"></i></Link></p>
              <p><a href=""><i class="fa fa-pencil" aria-hidden="true"></i></a></p>
          </div>
          <div class="description-actividad">
              <div class="opc">
                  <h5>Descripción: </h5>
                  <p>Cajoneras Linea Bozz (2 Puestos).</p>
              </div>
              <div class="opc">
                  <h5>Cliente: </h5>
                  <p>AFP Planvital S.A.</p>
              </div>
              <div class="opc">
                  <h5>Fecha </h5>
                  <p>Desde 2016-05-19 / Hasta 2016-05-19 / Días 4</p>
              </div>
          </div>
        </div>
      )

  }

}

export default Content