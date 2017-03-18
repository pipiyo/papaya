import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'
 
class Filtro extends React.Component {

  constructor(props) {
    super()
  }

  render() {
      return (
        <form onSubmit={this.props.renderFiltro}>
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
                <input autoComplete="off" data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} id="codigo" type="text" />
                <AutoComplet name="codigo" />
            </div>
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado" >
                    <option value="En Proceso">En Proceso</option>
                    <option value="ACTA">Acta</option>
                    <option value="OK">OK</option>
                    <option value="Nula">Nulo</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Vendedor</label>
                <select id="vendedor">
                    <option value="">Seleccione</option>
                    {
                      this.props.obj.ejecutivo.map( (ejecutivo) => {
                        return <option value={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`} key={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}>{`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}</option>
                      })
                    }
                </select>
            </div>
            <div class="item-filter">
                <label>Cliente</label>
                <input autoComplete="off" data-complete="cliente" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} id="cliente" type="text"/>
                <AutoComplet name="cliente" />
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