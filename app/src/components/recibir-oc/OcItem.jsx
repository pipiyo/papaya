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
                <h4>Recibir orden de compra</h4>
            </div>

            <div className="item-form">
                <label>Numero OC</label>
                <input required readOnly id="codigo" type="text"  onChange={this.props.renderInput} value={this.props.obj.input.codigo} />
            </div>

            <div className="item-form">
                <label>Proveedor</label>
                <input required readOnly id="proveedor" type="text"  onChange={this.props.renderInput} value={this.props.obj.input.proveedor} />
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>Devolución OC</h4>
            </div>

            <div className="item-form">
                <label>Código</label>
                  <select id="ocProducto">
                  <option value="">Seleccioné</option>
                  {
                    this.props.obj.renderProductos.map( (producto,i) => {
                      return <option value={`${producto.CODIGO_PRODUCTO}`} key={`${i}${producto.CODIGO_PRODUCTO}`}>{`${producto.CODIGO_PRODUCTO} - ${producto.DESCRIPCION}`}</option>
                    })
                  }
                </select>
            </div>
            <div className="item-form">
                <label>Cantidad</label>
                <input id="cantidad" type="text" />
            </div>
            <div className="item-form">
                <label>Razón</label>
                <select id="codigo">
                  <option value="">Seleccioné</option>
                  <option value="calidad">calidad</option>
                  <option value="Diferencia solicitado oc">Diferencia solicitado oc</option>
                </select>
            </div>
          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="button" value="Ingresar devolución"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item