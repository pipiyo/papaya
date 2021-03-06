import React from 'react'
import OcProductoItem from './OcProductoItem'
import format from 'format-number'
let myFormat = format({integerSeparator:'.',decimal: ','})

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-oc-descripction" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla o shift + scroll</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-oc-descripction" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-oc-descripction">
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
                    <td class="module-table-content-item"><p>{myFormat(this.props.obj.renderOc[0].SUB_TOTAL)}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento %</p></td>
                    <td class="module-table-content-item"><p>{myFormat(this.props.obj.renderOc[0].DESCUENTO_OC)}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento $</p></td>
                    <td class="module-table-content-item"><p>{myFormat(this.props.obj.renderOc[0].DESCUENTO_2)}</p></td>
                </tr>

                <tr>
                    <td class="right" colSpan="10"><p>Iva</p></td>
                    <td class="module-table-content-item"><p>{myFormat(this.props.obj.renderOc[0].IVA)}</p></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Total</p></td>
                    <td class="module-table-content-item"><p>{myFormat(this.props.obj.renderOc[0].TOTAL)}</p></td>
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