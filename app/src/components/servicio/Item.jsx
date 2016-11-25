import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import Autocomplete from '../../routes/AutocompleteRoutes'
import ServicioActions from '../../actions/ServicioActions'

class Item extends React.Component {

  constructor() {
    super()
  }

  componentWillMount(){
    ServicioActions.renderReclamo(this.props.tipo)
    ServicioActions.renderRochaValue(this.props.rocha)
  }

  componentWillUpdate(nextProps, nextState){
    if(this.props.tipo !== nextProps.tipo){ ServicioActions.renderReclamo(nextProps.tipo) }
  }

  renderFechaInicio(date){
    ServicioActions.renderFechaInicio(date)
  }

  renderFechaEntrega(date){
    ServicioActions.renderFechaEntrega(date)
  }

  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nueva Actividad</h4>
            </div>

             {this.props.reclamo} 

            <div className="item-form">
                <label>Rocha</label>
                <input required  id="rocha" type="text" />
            </div>

            <div className="item-form">
              <label>Servicio</label>
              <select required id="area" onChange={this.props.renderArea}>
                <option value="">Seleccioné</option>
                <option value="Adquisiciones">Abastecimiento</option>
                <option value="Bodega">Bodega</option>
                <option value="Desarrollo">Técnica</option>
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
                <label>Fecha Entrega Cliente</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaEntrega} onChange={this.renderFechaEntrega.bind(this)} />
            </div>

            <div className="item-form relative">
                <label>Días</label>
                <input data-complete="rocha" type="text" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input required id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input id="observacion" type="text"/>
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