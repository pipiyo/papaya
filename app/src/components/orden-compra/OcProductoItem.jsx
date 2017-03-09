import React from 'react'
import AutoComplet  from '../../routes/AutoComRoutes'

class OcProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td>
            <input data-complete="producto" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active" id="codigo-1" />
            <AutoComplet name="codigo-1" datos1="descripcion-1" datos2="stock-1" datos3="preciob-1" datos4="preciol-1" datos5="preciou-1" />
          </td>
          <td class="center">
            <input data-complete="rocha" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active medium center" id="rocha-1" />
            <AutoComplet name="rocha-1"/>
          </td>
          <td>
            <input data-complete="producto1" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active" id="descripcion-1" />
            <AutoComplet name="descripcion-1" datos1="codigo-1" datos2="stock-1" datos3="preciob-1" datos4="preciol-1" datos5="preciou-1" />
          </td>
          <td><input class="active" id="observaciones-1" /></td>
          <td class="center"><input class="active small center" id="stock-1" /></td>
          <td class="center"><input class="active small center" id="cantidad-1" /></td>
          <td class="center"><input class="active small center" id="preciob-1" /></td>
          <td class="center"><input class="active small center" id="preciou-1" /></td>
          <td class="center"><input class="active small center" id="preciol-1" /></td>
          <td class="center"><input class="active small center" id="descuento-1" /></td>
          <td class="center"><input class="active small center" id="total-1" /></td>
        </tr> 
      )

  }

}

export default OcProductoItem