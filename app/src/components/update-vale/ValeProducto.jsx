import React from 'react'
import ValeProductoItem from './ValeProductoItem'
import AutocompleteActions from '../../actions/AutocompleteActions'
class ValeProducto extends React.Component {

  constructor() {
    super()
  }
  autocompleteTotalOC(ev){
    ev.persist()
    AutocompleteActions.autocompleteTotalOC()
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
            <table class="vale">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Observaciones</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.obj.compVale}
  
                </tbody>
              </table>
          </div>
        </div>  
      )

  }

}

export default ValeProducto