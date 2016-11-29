import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import ReclamoActions from '../../../actions/ReclamoActions'

class Item extends React.Component {
  constructor() {
    super()
  }
  renderFechaInicio(date){
    ReclamoActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    ReclamoActions.renderFechaEntrega(date)
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nuevo Reclamo</h4>
            </div>

            <div className="item-form">
                <label>Numero</label>
                <input id="reclamo" type="number" />
            </div>

            <div className="item-form">
                <label>Rocha</label>
                <input id="rocha" type="text" />
            </div>

            <div className="item-form">
              <label>Area</label>
              <select id="area">
                <option value="">Seleccioné</option>
                <option value="tecnica">Técnica</option>
                <option value="comercial">Comercial</option>
                <option value="produccion">Producción</option>
                <option value="despacho">Despacho</option>
                <option value="instalacion">Instalación</option>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>

            <div className="item-form">
              <label>Razon</label>
              <select id="razon">
                <option value="">Seleccioné</option>
                <option value="Faltante material">Faltante material</option>
                <option value="Acabado diferente">Acabado diferente</option>
                <option value="Dimensión diferente">Dimensión diferente</option>
                <option value="Defecto de fábrica">Defecto de fábrica</option>
                <option value="diseño de producto">diseño de producto</option>
                <option value="Daños otros">Daños otros</option>
              </select>
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaInicio} onChange={this.renderFechaInicio.bind(this)} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaEntrega} onChange={this.renderFechaEntrega.bind(this)} />
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
              <label>Area</label>
              <select id="area1">
                <option value="">Seleccioné</option>
                <option value="tecnica">Técnica</option>
                <option value="comercial">Comercial</option>
                <option value="produccion">Producción</option>
                <option value="despacho">Despacho</option>
                <option value="instalacion">Instalación</option>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>
          </div>

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