import React from 'react'
import format from 'format-number'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import ClonerRochaActions from '../../actions/ClonerRochaActions'

class ServicioItem extends React.Component {

  constructor() {
    super()
  }
  renderFechaInicioItem(value,date,e){
    ClonerRochaActions.renderFechaInicioItem(date,value)
  }
  renderFechaEntregaItem(value,date,e){
    ClonerRochaActions.renderFechaEntregaItem(date,value)
  }
  render() {
      return (         
        <tr>
          <td>
            <div className="item-form opc">
              <input type="checkbox" id={`check-servicio-${this.props.num}`} name={`check-servicio-${this.props.num}`} value={this.props.servicio.CODIGO_SERVICIO}/>
              <label class="checkbox" for={`check-servicio-${this.props.num}`}></label>
              <label class="name-check">{this.props.servicio.NOMBRE_SERVICIO}</label>
            </div>
          </td>
          <td><input type="text" class="active big center" id={`descripcion-${this.props.num}`} /></td>
          <td>
            <DatePicker readOnly class="date active big center" id={`fechaInicio-${this.props.num}`} selected={this.props.obj.fechaInicio[this.props.num]} dateFormat="YYYY-MM-DD" onChange={this.renderFechaInicioItem.bind(this, this.props.num)}  />
          </td>
          <td>
            <DatePicker readOnly class="date active big center" id={`fechaEntrega-${this.props.num}`} selected={this.props.obj.fechaEntrega[this.props.num]} dateFormat="YYYY-MM-DD" onChange={this.renderFechaEntregaItem.bind(this, this.props.num)}  />
          </td>
        </tr> 
      )

  }

}

export default ServicioItem