import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Item extends React.Component {

  constructor() {
    super()
    this.state = {reclamo:"",fechaInicio:moment(),fechaEntrega:moment()}
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.tipo == "reclamo"){
      this.state.reclamo = <div className="item-form"><label>Reclamo</label><input id="reclamo" type="text" /></div>
    }else{
      this.state.reclamo = ""
    }
  }

  componentWillMount(){
    if(this.props.tipo == "reclamo"){
      this.setState({reclamo:<div className="item-form"><label>Reclamo</label><input id="reclamo" type="text" /></div>})
    }else{
      this.setState({reclamo:""})
    }
  }
  
  fechaInicioDate(date){
    this.setState({ fechaInicio: date });
  }

  fechaEntregaDate(date){
    this.setState({ fechaEntrega: date });
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
              <select required id="area" onChange={this.props.formArea}>
                <option value="">Seleccioné</option>
                <option value="Adquisiciones">Abastecimiento</option>
                <option value="Bodega">Bodega</option>
                <option value="Desarrollo">Técnica</option>
                <option value="Despacho">Despacho</option>
                <option value="Instalacion">Instalacion</option>
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
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.state.fechaInicio} onChange={this.fechaInicioDate.bind(this)} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.state.fechaEntrega} onChange={this.fechaEntregaDate.bind(this)} />
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