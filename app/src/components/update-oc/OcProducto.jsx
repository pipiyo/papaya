import React from 'react'
import OcProductoItem from './OcProductoItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  autocompleteTotalUpdateOC(ev){
    ev.persist()
    AutocompleteActions.autocompleteTotalUpdateOC()
  }
  render() {
      return (         
        <div>
          <div class="module-arrow top">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-oc-descripction" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
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
                {this.props.obj.compOc}
                <tr>
                    <td class="right" colSpan="10"><p>Sub Total</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="sub-total" readOnly id="editarocsubtotal" class="small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento %</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="descuento-oc" id="editarocdescuentopor" onChange={this.autocompleteTotalUpdateOC.bind(this)} class="active small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Descuento $</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="descuento-2" id="editarocdescuentopes" onChange={this.autocompleteTotalUpdateOC.bind(this)} class="active small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Neto</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="neto" id="editarocneto" readOnly class="small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Iva</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="iva" id="editarociva" readOnly class="small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right" colSpan="10"><p>Total</p></td>
                    <td class="module-table-content-item"><input data-txteditaroc="total" id="editaroctotalfinal" readOnly class="small center" type="text" /></td>
                </tr>
                <tr>
                    <td class="right"><p>Observaciones</p></td>
                    <td colSpan="10" class="module-table-content-item"><input data-txteditaroc="observacion" id="editarocobservaciones" class="active big center" type="text" /></td>
                </tr>
                </tbody>
              </table>
          </div>
        </div>  
      )

  }

}

export default OcProducto