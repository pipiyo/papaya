import React from 'react'
import OcProductoItem from './OcProductoItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-table-new">
            <table class="oc">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Rocha</th>
                    <th>Descripción</th>
                    <th>Observaciones</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th>Precio Bodega</th>
                    <th>Precio Unitario</th>
                    <th>Precio Lista</th>
                    <th>Descuento</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.obj.renderProductos.map( (producto,i) => {
                    return <OcProductoItem key={i}  producto={producto}/>
                  })
                }
                <tr>
                    <td class="right" colSpan="10"><p>Sub Total</p></td>
                    <td class="module-table-content-item"><p>{this.props.obj.renderOc[0].SUB_TOTAL}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento %</p></td>
                    <td class="module-table-content-item"><p>{this.props.obj.renderOc[0].DESCUENTO_OC}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento $</p></td>
                    <td class="module-table-content-item"><p>{this.props.obj.renderOc[0].DESCUENTO_2}</p></td>
                </tr>

                <tr>
                    <td class="right" colSpan="10"><p>Iva</p></td>
                    <td class="module-table-content-item"><p>{this.props.obj.renderOc[0].IVA}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Total</p></td>
                    <td class="module-table-content-item"><p>{this.props.obj.renderOc[0].TOTAL}</p></td>
                </tr>
                <tr>
                    <td class="right"><p>Observaciones</p></td>
                    <td colSpan="10" class="module-table-content-item"><p>{this.props.obj.renderOc[0].OBSERVACION}</p></td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>    
      )

  }

}

export default OcProducto