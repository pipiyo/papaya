import React from 'react'

class Filtro extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="module-filter">
          <div class="item-filter">
             <label> Fecha Inicio </label>
             <input onChange={this.props.filtro} id="fechaInicio" type="text" class="date" />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <input onChange={this.props.filtro} id="fechaEntrega" type="text" class="date" />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input onChange={this.props.filtro} id="codigo" type="text"/>
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select onChange={this.props.filtro} id="estado">
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select onChange={this.props.filtro} id="vendedor">
                  <option value="">Seleccione</option>
                  <option value="Amanda Godoy Santis">Amanda Godoy Santis</option>
                  <option value="Maria de los Angeles Nuñez Duarte">Maria de los Angeles Nuñez Duarte</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select onChange={this.props.filtro} id="categoria">
                  <option value="">Seleccione</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Solicitud">Solicitud</option>
                  <option value="Proceso">Proceso</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Cliente</label>
              <input onChange={this.props.filtro} id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro