import React from 'react'

import ItemProduccion from './ItemProduccion'
import ItemSillas from './ItemSillas'
import ItemInstalacion from './ItemInstalacion'
import ItemDespacho from './ItemDespacho'

class Item extends React.Component {

  constructor() {
    super()
  }

  render() {
    let area;
    switch(this.props.area) {
      case "Produccion":
        area = <ItemProduccion />
      break;
      case "Instalacion":
        area = <ItemInstalacion />
      break;
      case "Sillas":
        area = <ItemSillas />
      break;
      case "Despacho":
        area = <ItemDespacho />
      break;
      default:
        area = ""
      }
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nueva Actividad</h4>
            </div>

            <div className="item-form">
              <label>Servicio</label>
              <select id="area" onChange={this.props.formArea}>
                <option value="">Seleccioné</option>
                <option value="Adquisiciones">Adquisiciones</option>
                <option value="Bodega">Bodega</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Despacho">Despacho</option>
                <option value="Instalacion">Instalacion</option>
                <option value="Prevención de Riesgos">Prevención de Riesgos</option>
                <option value="Produccion">Produccion</option>
                <option value="Sillas">Sillas</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>

            <div className="item-form">
              <label>Categoría</label>
              <select id="categoria">
                <option value="">Seleccioné</option>
                <option value="proyecto">Proyecto</option>
                <option value="solicitud">Solicitud</option>
                <option value="solicitud">Proceso</option>
              </select>
            </div>

            <div className="item-form">
                <label>Supervisor</label>
                <input id="supervisor" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <input class="date" id="fechaInicio" type="text"/>
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <input class="date" id="fechaEntrega" type="text"/>
            </div>

            <div className="item-form">
                <label>Días</label>
                <input type="number" class="date" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input id="Observacion" type="text"/>
            </div>

            <div className="item-form">
                <label>FI</label>
                <input type="number" id="fi" />
            </div>
          </div>

          { area }

          <div className="module-form button">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item