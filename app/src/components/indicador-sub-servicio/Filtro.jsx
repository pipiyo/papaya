import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
  
      return (
        <div class="module-filter">
          <div class="item-filter">
              <label> Fecha Inicio </label>
              <DatePicker class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.filtro.fechaInicio} onChange={this.props.renderFiltroFi} />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <DatePicker class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.filtro.fechaEntrega} onChange={this.props.renderFiltroFe} />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input autoComplete="off" id="codigo" type="text" onChange={this.props.renderFiltro} />
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select id="estado" onChange={this.props.renderFiltro}>
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="Emitido">Emitido</option>
                  <option value="Parcial">Parcial</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select id="vendedor" onChange={this.props.renderFiltro}>
                  <option value="">Seleccione</option>
                  {
                    this.props.ejecutivo.map( (ejecutivo) => {
                      return <option value={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`} key={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}>{`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}</option>
                    })
                  }
              </select>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select id="categoria" onChange={this.props.renderFiltro}>
                  <option value="">Seleccione</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Solicitud">Solicitud</option>
                  <option value="Proceso">Proceso</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Cliente</label>
              <input onChange={this.props.renderFiltro} autoComplete="off" id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro