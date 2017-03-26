import React from 'react'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'

class ValeProductoItem extends React.Component {

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

  render(){
      return (         
        <tr>
          <td>
            <input data-countemisionvale="ok" type="text" data-complete="producto" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} class="active" id={`emisionvalecodigo-${this.props.num}`} />
            <AutoComplet name={`emisionvalecodigo-${this.props.num}`} datos1={`emisionvaledescripcion-${this.props.num}`} datos2={`emisionvalestock-${this.props.num}`}  datos3={`emisionvalepreciol-${this.props.num}`} datosCantidad={`emisionvalecantidad-${this.props.num}`}  />
          </td>
          <td>
            <input type="text" data-complete="producto1" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`emisionvaledescripcion-${this.props.num}`} />
            <AutoComplet name={`emisionvaledescripcion-${this.props.num}`} datos1={`emisionvalecodigo-${this.props.num}`} datos2={`emisionvalestock-${this.props.num}`}  datos3={`emisionvalepreciol-${this.props.num}`} datosCantidad={`emisionvalecantidad-${this.props.num}`} />
          </td>
          <td><input class="active" id={`emisionvaleobservaciones-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`emisionvalestock-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`emisionvalecantidad-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`emisionvalepreciol-${this.props.num}`} /></td>
        </tr> 
      )

  }

}

export default ValeProductoItem