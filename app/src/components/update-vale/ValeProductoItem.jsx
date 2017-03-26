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
            <input data-counteditarvale="ok" type="text" data-complete="producto" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} class="active" id={`editarvalecodigo-${this.props.num}`} />
            <AutoComplet name={`editarvalecodigo-${this.props.num}`} datos1={`editarvaledescripcion-${this.props.num}`} datos2={`editarvalestock-${this.props.num}`}  datos3={`editarvalepreciol-${this.props.num}`} datosCantidad={`editarvalecantidad-${this.props.num}`}  />
          </td>
          <td>
            <input type="text" data-complete="producto1" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`editarvaledescripcion-${this.props.num}`} />
            <AutoComplet name={`editarvaledescripcion-${this.props.num}`} datos1={`editarvalecodigo-${this.props.num}`} datos2={`editarvalestock-${this.props.num}`}  datos3={`editarvalepreciol-${this.props.num}`} datosCantidad={`editarvalecantidad-${this.props.num}`} />
          </td>
          <td><input class="active" id={`editarvaleobservaciones-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`editarvalestock-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`editarvalecantidad-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" id={`editarvalepreciol-${this.props.num}`} /></td>
        </tr> 
      )

  }

}

export default ValeProductoItem