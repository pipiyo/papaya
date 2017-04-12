import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'

class Filtro extends React.Component {

  constructor(props) {
    super(props)
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
                <label> Fecha Inicio </label>
                <DatePicker autoComplete="off" class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.filtro.fechaInicio} onChange={this.props.renderFiltroFi} />
            </div>
            <div class="item-filter">
                <label> Fecha Entrega </label>
                <DatePicker autoComplete="off" class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.filtro.fechaEntrega} onChange={this.props.renderFiltroFe} />
            </div>
            <div class="item-filter">
                <label> Código Rocha</label>
                <input data-complete="rocha" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} autoComplete="off" id="codigo" type="text" />
                <AutoComplet name="codigo" />
            </div>
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado" >
                    <option value="En Proceso">En Proceso</option>
                    <option value="Emitido">Emitido</option>
                    <option value="Parcial">Parcial</option>
                    <option value="OK">OK</option>
                    <option value="Nula">Nulo</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Vendedor</label>
                <select id="vendedor" >
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
                <select id="categoria" >
                    <option value="">Seleccione</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Proceso">Proceso</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Cliente</label>
                <input data-complete="cliente" onBlur={this.autocompleteOff.bind(this)} onChange={this.autocomplete.bind(this)} autoComplete="off" id="cliente" type="text"/>
                <AutoComplet name="cliente" />
            </div>
            <div class={(this.props.area == "planificación")?`item-filter`:`item-filter hidden`}>
                <label>Nombre Servicio</label>
                <select id="servicio" >
                    <option value="">Seleccione</option>
                    <option value="Adquisiciones">Abastecimiento</option>
                    <option value="FI">FI</option>
                    <option value="Desarrollo">Técnica</option>
                    <option value="Desarrollo-especial">Técnica especial</option>
                    <option value="Despacho">Despacho</option>
                    <option value="Instalacion">Instalación</option>
                    <option value="Planificacion">Planificación</option>
                    <option value="Prevención de Riesgos">Prevención de Riesgos</option>
                    <option value="Produccion">Producción</option>
                    <option value="Sillas">Sillas</option>
                    <option value="Sistema">Sistema</option>
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