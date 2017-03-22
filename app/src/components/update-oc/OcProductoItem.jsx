import React from 'react'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'
import ordenCompraActions from '../../actions/ordenCompraActions'

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
  autocompleteTotalUpdateOC(ev){
    ev.persist()
    AutocompleteActions.autocompleteTotalUpdateOC()
  }

  render(){
      return (         
        <tr>
          <td>
            <input data-editaroc="ok" type="text" data-complete="producto" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} class="active" id={`editaroccodigo-${this.props.num}`} />
            <AutoComplet name={`editaroccodigo-${this.props.num}`} datos1={`editarocdescripcion-${this.props.num}`} datos2={`editarocstock-${this.props.num}`} datos3={`editarocpreciob-${this.props.num}`} datos4={`editarocpreciol-${this.props.num}`} datos5={`editarocpreciou-${this.props.num}`} datos6={`editaroctotal-${this.props.num}`} datosCantidad={`editaroccantidad-${this.props.num}`} datosTotalOC='okupdate' />
          </td>
          <td class="center">
            <input type="text" data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active medium center" id={`editarocrocha-${this.props.num}`} />
            <AutoComplet name={`editarocrocha-${this.props.num}`}/>
          </td>
          <td>
            <input type="text" data-complete="producto1" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`editarocdescripcion-${this.props.num}`} />
            <AutoComplet name={`editarocdescripcion-${this.props.num}`} datos1={`editaroccodigo-${this.props.num}`} datos2={`editarocstock-${this.props.num}`} datos3={`editarocpreciob-${this.props.num}`} datos4={`editarocpreciol-${this.props.num}`} datos5={`editarocpreciou-${this.props.num}`} datos6={`editaroctotal-${this.props.num}`} datosCantidad={`editaroccantidad-${this.props.num}`} datosTotalOC='okupdate' />
          </td>
          <td><input class="active" id={`editarocobservaciones-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`editarocstock-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalUpdateOC.bind(this)} id={`editaroccantidad-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`editarocpreciob-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`editarocpreciou-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalUpdateOC.bind(this)} id={`editarocpreciol-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalUpdateOC.bind(this)} id={`editarocdescuento-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`editaroctotal-${this.props.num}`} /></td>
        </tr> 
      )

  }

}

export default OcProductoItem