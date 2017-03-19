import React from 'react'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'

class OcProductoItem extends React.Component {

  constructor() {
    super()
  }
  autocomplete(ev){
    ev.persist()
    AutocompleteActions.autocomplete(ev)
  }
  autocompleteOff(ev,input){
    ev.persist()
    AutocompleteActions.autocompleteOff(ev)
  }
  render() {
      return (         
        <tr>
          <td>
            <input type="text" data-complete="producto" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`codigo-${this.props.num}`} />
            <AutoComplet name={`codigo-${this.props.num}`} datos1={`descripcion-${this.props.num}`} datos2={`stock-${this.props.num}`} datos3={`preciob-${this.props.num}`} datos4={`preciol-${this.props.num}`} datos5={`preciou-${this.props.num}`} />
          </td>
          <td class="center">
            <input type="text" data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active medium center" id={`rocha-${this.props.num}`} />
            <AutoComplet name={`rocha-${this.props.num}`}/>
          </td>
          <td>
            <input type="text" data-complete="producto1" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`descripcion-${this.props.num}`} />
            <AutoComplet name={`descripcion-${this.props.num}`} datos1={`codigo-${this.props.num}`} datos2={`stock-${this.props.num}`} datos3={`preciob-${this.props.num}`} datos4={`preciol-${this.props.num}`} datos5={`preciou-${this.props.num}`} />
          </td>
          <td><input class="active" id={`observaciones-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`stock-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`cantidad-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`preciob-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`preciou-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`preciol-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`descuento-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`total-${this.props.num}`} /></td>
        </tr> 
      )

  }

}

export default OcProductoItem