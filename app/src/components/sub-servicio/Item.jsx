import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import SubServicioActions from '../../actions/SubServicioActions'

class Item extends React.Component {

  constructor() {
    super()
    this.state = {fechaInicio:moment(),fechaEntrega:moment()}
  }
  renderFechaInicio(date){
    SubServicioActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    SubServicioActions.renderFechaEntrega(date)
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nueva Sub Actividad</h4>
            </div>

            <div className="item-form">
              <label>Servicio</label>
              <select required id="area" onChange={this.props.renderArea}>
                <option value="">Seleccioné</option>
                <option value="Adquisiciones">Abastecimiento</option>
                <option value="FI">FI</option>
                <option value="Desarrollo">Técnica</option>
                <option value="Desarrollo-especial">Técnica especial</option>
                <option value="Despacho">Despacho</option>
                <option value="Instalacion">Instalación</option>
                <option value="Planificacion">Planificación</option>
                <option value="Prevención de Riesgos">Prevención de Riesgos</option>
                <option value="Produccion">Producción</option>
                <option value="Sillas">Sillas</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>

            <div className="item-form">
              <label>Categoría</label>
              <select required id="categoria">
                <option value="">Seleccioné</option>
                <option value="proyecto">Proyecto</option>
                <option value="solicitud">Solicitud</option>
                <option value="solicitud">Proceso</option>
              </select>
            </div>

            <div className="item-form">
                <label>Supervisor</label>
                <input required id="supervisor" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaInicio} onChange={this.renderFechaInicio.bind(this)} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaEntrega} onChange={this.renderFechaEntrega.bind(this)} />
            </div>

            <div className="item-form">
                <label>Días</label>
                <input type="number" class="date" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input required id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input required id="observacion" type="text"/>
            </div>
          </div>
          {this.props.area}

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