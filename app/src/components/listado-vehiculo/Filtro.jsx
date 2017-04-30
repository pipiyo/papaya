import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
 
class Filtro extends React.Component {

  constructor(props) {
    super()
  }

  render() {
      return (
        <form onSubmit={this.props.renderFiltro}>
          <div class="module-filter">
            <div class="item-filter">
                <label>Vehículo</label>
                <input autoComplete="off" id="vehiculo" type="text"/>
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