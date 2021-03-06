import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'
 
class Filtro extends React.Component {

  constructor(props) {
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
        <form onSubmit={this.props.renderFiltro}>
          <div class="module-filter">
            <div class="item-filter">
                <label>Proveedor</label>
                <input autoComplete="off" data-complete="proveedor" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} id="proveedor" type="text"/>
                <AutoComplet name="proveedor" />
            </div>
            <div className="item-filter ">
              <input id="btn-buscar" value="Buscar" type="submit" />
            </div>
          </div>
        </form>
      )

  }

}

export default Filtro