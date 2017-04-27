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
                <label>Rocha</label>
                <input autoComplete="off" data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} id="rocha" type="text"/>
                <AutoComplet name="rocha" />
            </div>
            <div class="item-filter">
                <label>Reclamo</label>
                <input autoComplete="off" id="reclamo" type="text"/>
            </div>
            <div className="item-filter" >
              <label>Estado</label>
              <select id="estado" >
                <option value="En Proceso">En Proceso</option>
                <option value="Nulo">Nulo</option>
                <option value="Ok">Ok</option>
              </select>
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