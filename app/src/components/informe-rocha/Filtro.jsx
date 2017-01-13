import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends React.Component {

  constructor(props) {
    super()
  }

  render() {
      return (
        <div class="module-filter">
          <div class="item-filter">
              <label> Fecha Inicio </label>
              <DatePicker autoComplete="off" class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.filtro.fechaInicio} onChange={this.props.renderFiltroFi} />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <DatePicker autoComplete="off" class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.filtro.fechaEntrega} onChange={this.props.renderFiltroFe} />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input autoComplete="off" id="codigo" type="text" onChange={this.props.renderFiltro} />
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select id="estado" onChange={this.props.renderFiltro} >
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select id="vendedor" onChange={this.props.renderFiltro} >
                  <option value="">Seleccione</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Cliente</label>
              <input autoComplete="off" onChange={this.props.renderFiltro}  id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro