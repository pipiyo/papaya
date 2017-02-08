import React from 'react'

class FilterOC extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
        <form onSubmit={this.props.renderFilter}>
          <div class="module-filter">
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado-oc" >
                    <option value="">Seleccione</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="Nulo">Nulo</option>
                    <option value="OK">OK</option>
                    <option value="modificacion">Modificación</option>
                </select>
            </div>
            <div className="item-filter ">
              <input id="btn-buscar-oc" value="Buscar" type="submit" />
            </div>
          </div>
        </form>
      )

  }

}

export default FilterOC