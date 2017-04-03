import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import UpdateOcFechaActions from '../../actions/UpdateOcFechaActions'

class Item extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    UpdateOcFechaActions.selectOption(document.getElementById("estado"), this.props.obj.input.estado,true)
    UpdateOcFechaActions.selectOption(document.getElementById("enviado"), this.props.obj.input.enviado,false)
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Orden de compra</h4>
            </div>

            <div className="item-form">
                <label>Estado</label>
                <select id="estado" >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Nulo">Nulo</option>
                  <option value="Ok">Ok</option>
                </select>
            </div>

            <div className="item-form">
                <label>Envíado a proveedor</label>
                <select id="enviado" >
                  <option value="0">No</option>
                  <option value="1">Si</option>               
                </select>
            </div>

            <div className="item-form">
                <label>Fecha Confirmación</label>
                <DatePicker readOnly class="date" id="fechaConfirmacion" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaConfirmacion} onChange={this.props.renderFechaConfirmacion} />
            </div>

            <div className="item-form">
                <label>Fecha Envío Valija</label>
                <DatePicker readOnly class="date" id="fechaActa" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaActa} onChange={this.props.renderFechaActa} />
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