import React from 'react'

class FilterVale extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
        <form onSubmit={this.props.renderFilter}>
          <div class="module-filter">
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado-vale" >
                  <option value="">Seleccione</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="entregado">Entregado</option>
                    <option value="Nulo">Nulo</option>
                </select>
            </div>
            <div className="item-filter ">
              <input id="btn-buscar-vale" value="Buscar" type="submit" />
            </div>
          </div>
        </form>
      )

  }

}

export default FilterVale