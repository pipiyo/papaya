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
  autocompleteTotalOC(ev){
    ev.persist()
    AutocompleteActions.autocompleteTotalOC()
  }

  render(){
      return (         
        <tr>
          <td>
            <input data-countemisionoc="ok" type="text" data-complete="producto" onBlur={this.autocompleteOff.bind(this)}  onChange={this.autocomplete.bind(this)} class="active" id={`emisionoccodigo-${this.props.num}`} />
            <AutoComplet name={`emisionoccodigo-${this.props.num}`} datos1={`emisionocdescripcion-${this.props.num}`} datos2={`emisionocstock-${this.props.num}`} datos3={`emisionocpreciob-${this.props.num}`} datos4={`emisionocpreciol-${this.props.num}`} datos5={`emisionocpreciou-${this.props.num}`} datos6={`emisionoctotal-${this.props.num}`} datosCantidad={`emisionoccantidad-${this.props.num}`} datosTotalOC='ok' />
          </td>
          <td class="center">
            <input type="text" data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active medium center" id={`emisionocrocha-${this.props.num}`} />
            <AutoComplet name={`emisionocrocha-${this.props.num}`}/>
          </td>
          <td>
            <input type="text" data-complete="producto1" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} class="active" id={`emisionocdescripcion-${this.props.num}`} />
            <AutoComplet name={`emisionocdescripcion-${this.props.num}`} datos1={`emisionoccodigo-${this.props.num}`} datos2={`emisionocstock-${this.props.num}`} datos3={`emisionocpreciob-${this.props.num}`} datos4={`emisionocpreciol-${this.props.num}`} datos5={`emisionocpreciou-${this.props.num}`} datos6={`emisionoctotal-${this.props.num}`} datosCantidad={`emisionoccantidad-${this.props.num}`} datosTotalOC='ok' />
          </td>
          <td><input class="active" id={`emisionocobservaciones-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`emisionocstock-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalOC.bind(this)} id={`emisionoccantidad-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`emisionocpreciob-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`emisionocpreciou-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalOC.bind(this)} id={`emisionocpreciol-${this.props.num}`} /></td>
          <td class="center"><input type="text" class="active small center" onChange={this.autocompleteTotalOC.bind(this)} id={`emisionocdescuento-${this.props.num}`} /></td>
          <td class="center"><input type="text" readOnly class="small center" id={`emisionoctotal-${this.props.num}`} /></td>
        </tr> 
      )

  }

}

export default OcProductoItem