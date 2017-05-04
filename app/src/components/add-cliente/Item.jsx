import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nuevo cliente</h4>
            </div>

            <div className="item-form">
                <label>Rut</label>
                <input required id="rut" type="text" value={this.props.obj.rut} onChange={this.props.renderInput}   />
            </div>

            <div className="item-form">
                <label>Nombre</label>
                <input required id="nombre" type="text" />
            </div>

            <div className="item-form">
                <label>Razón social</label>
                <input required id="razon" type="text" />
            </div>

            <div className="item-form">
                <label>Giro</label>
                <input required id="giro" type="text" />
            </div>

            <div className="item-form">
                <label>Dirección</label>
                <input required id="direccion" type="text" />
            </div>

            <div className="item-form">
                <label>Contacto</label>
                <input id="contacto" type="text" />
            </div>

            <div className="item-form">
                <label>Forma de pago</label>
                <input id="pago" type="text" />
            </div>

            <div className="item-form">
                <label>Telefono 1</label>
                <input id="telefono1" type="text" />
            </div>

            <div className="item-form">
                <label>Telefono 2</label>
                <input id="telefono2" type="text" />
            </div>

            <div className="item-form">
                <label>Mail</label>
                <input id="mail" type="text" />
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