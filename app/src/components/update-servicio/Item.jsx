import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import UpdateServicioActions from '../../actions/UpdateServicioActions'

class Item extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    UpdateServicioActions.selectOption(document.getElementById("categoria"), this.props.datos[0].CATEGORIA,true)
    UpdateServicioActions.selectOption(document.getElementById("estado"), this.props.datos[0].ESTADO,true)
  }

  renderInput(event){
    UpdateServicioActions.renderInput(event.target.id,event.target.value)
  }

  renderFechaInicio(date){
    UpdateServicioActions.renderFechaInicio(date)
  }

  renderFechaEntrega(date){
    UpdateServicioActions.renderFechaEntrega(date)
  }

  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar Actividad</h4>
            </div>

            <div className="item-form">
                <label>Número</label>
                <input required id="numero" type="text" value={this.props.input.codigo} onChange={this.renderInput.bind(this)} />
            </div>

            <div className="item-form">
              <label>Categoría</label>
              <select required id="categoria">
                <option value="proyecto">Proyecto</option>
                <option value="solicitud">Solicitud</option>
                <option value="proceso">Proceso</option>
              </select>
            </div>

            <div className="item-form">
              <label>Estado</label>
              <select id="estado">
                <option value="OK">Ok</option>
                <option value="EN PROCESO">En Proceso</option>
                <option value="NULO">Nulo</option>
              </select>
            </div>

            <div className="item-form">
                <label>Supervisor</label>
                <input required value={this.props.input.supervisor} onChange={this.renderInput.bind(this)} id="supervisor" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.input.fechaInicio} onChange={this.renderFechaInicio.bind(this)} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega Cliente</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.input.fechaEntrega} onChange={this.renderFechaEntrega.bind(this)} />
            </div>

            <div className="item-form">
                <label>Días</label>
                <input value={this.props.input.dias} onChange={this.renderInput.bind(this)} type="number" class="date" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input required value={this.props.input.descripcion} onChange={this.renderInput.bind(this)} id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input value={this.props.input.observaciones} onChange={this.renderInput.bind(this)} id="observacion" type="text"/>
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