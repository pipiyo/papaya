import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import SubActividad  from './SubActividad'
import AutoComplet  from '../../routes/AutoComRoutes'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Ingreso Vale</h4>
            </div>
            <div className="item-form">
                <label>Numero Vale</label>
                <input readOnly value={this.props.obj.numeroVale} required id="codigo" type="text" />
            </div>
            <div className="item-form">
                <label>Departamento</label>
                <select required id="departamento">
                  <option value="">Seleccioné</option>
                  <option value="PRODUCCIÓN">Producción</option>
                  <option value="DESARROLLO">Desarrollo</option>
                  <option value="Abastecimiento">Abastecimiento</option>
                  <option value="SILLAS">Sillas</option>
                  <option value="INSTALACIONES">Instalaciones</option>
                  <option value="DESPACHO">Despacho</option>
                </select>
            </div>
            <div className="item-form">
                <label>Rocha</label>
                <input type="text" data-complete="rocha" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active" id="rocha" />
                <AutoComplet name="rocha" />
            </div>
            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.item.fecha.fechaInicio} onChange={this.props.renderFechaInicio} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.item.fecha.fechaEntrega} onChange={this.props.renderFechaEntrega} />
            </div>

            <div className="item-form">
                <label>Empleado</label>
                <input id="empleado" type="text" />
            </div>
          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="button" onClick={this.props.addSubActividad} value="Ingresar nueva"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item