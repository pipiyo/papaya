import React from 'react'

class FilterServicio extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
      return (
        <form onSubmit={this.props.renderFilter}>
          <div class="module-filter">
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado-servicio" >
                    <option value="">Seleccione</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="En ruta">En ruta</option>
                    <option value="OK">OK</option>
                    <option value="Nulo">Nulo</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Categoría</label>
                <select id="categoria-servicio" >
                    <option value="">Seleccione</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Proceso">Proceso</option>
                </select>
            </div>
            <div className="item-filter ">
              <input id="btn-buscar-servicio" value="Buscar" type="submit" />
            </div>
          </div>
        </form>
      )

  }

}

export default FilterServicio