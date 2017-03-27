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
                <h4>Producto</h4>
            </div>

            <div className="item-form">
                <label>Código</label>
                <input readOnly  value={this.props.obj.input.codigo} onChange={this.props.renderInput} required id="codigo" type="text" />
            </div>


            <div className="item-form">
                <label>Precio compra</label>
                <input onChange={this.props.renderInput} value={this.props.obj.input.precio} id="precio" type="text" />
            </div>

            <div className="item-form">
                <label>Precio Venta</label>
                <input onChange={this.props.renderInput} value={this.props.obj.input.precioVenta} id="precio-venta" type="text"/>
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