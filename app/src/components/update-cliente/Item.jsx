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
                <h4>Actualizar cliente</h4>
            </div>

            <div className="item-form">
                <label>Rut</label>
                <input required id="rut" type="text" value={this.props.obj.input.rut} onChange={this.props.renderInput}   />
            </div>

            <div className="item-form">
                <label>Nombre</label>
                <input required id="nombre" type="text" value={this.props.obj.input.nombre} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Razón social</label>
                <input required id="razon" type="text" value={this.props.obj.input.razon} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Giro</label>
                <input required id="giro" type="text" value={this.props.obj.input.giro} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Dirección</label>
                <input required id="direccion" type="text" value={this.props.obj.input.direccion} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Contacto</label>
                <input id="contacto" type="text" value={this.props.obj.input.contacto} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Forma de pago</label>
                <input id="pago" type="text" value={this.props.obj.input.pago} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Telefono 1</label>
                <input id="telefono1" type="text" value={this.props.obj.input.telefono1} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Telefono 2</label>
                <input id="telefono2" type="text" value={this.props.obj.input.telefono2} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Mail</label>
                <input id="mail" type="text" value={this.props.obj.input.mail} onChange={this.props.renderInput} />
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