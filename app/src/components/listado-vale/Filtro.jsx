import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends React.Component {
  constructor() {
    super()
  }
  render() {
      return (
      <form onSubmit={this.props.renderFiltro}>
        <div class="module-filter">
            <div class="item-filter">
                <label>Código Vale</label>
                <input autoComplete="off" id="codigo" type="text" />
            </div>
            <div class="item-filter">
                <label>Rocha</label>
                <input autoComplete="off" id="rocha" type="text" />
            </div>
            <div class="item-filter">
                <label>Departamento</label>
                <select id="departamento" >
                  <option value="">Seleccioné</option>
                  <option value="ADQUICICIONES">Adquisiciones</option>
                  <option value="ABASTECIMIENTO">Abastecimiento</option>
                  <option value="DESARROLLO">Desarrollo</option>
                  <option value="DESPACHO">Despacho</option>
                  <option value="INSTALACIONES">Instalaciones</option>
                  <option value="PRODUCCION">Producción</option>
                  <option value="SILLAS">Sillas</option>
                </select>
            </div>
            <div className="item-filter opc" >
              <label>Estado</label>
              <select id="estado" >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Nulo">Nulo</option>
                <option value="Ok">Ok</option>
              </select>
            </div>
            <div class="item-filter">
                <label> Fecha Inicio </label>
                <DatePicker autoComplete="off" class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.filtro.fechaInicio} onChange={this.props.renderFiltroFi} />
            </div>
            <div class="item-filter">
                <label> Fecha Entrega </label>
                <DatePicker autoComplete="off" class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.filtro.fechaEntrega} onChange={this.props.renderFiltroFe} />
            </div>
            <div className="item-filter ">
              <input id="btn-buscar" value="Buscar"  type="submit" />
            </div>
        </div>
      </form>
      )

  }

}

export default Filtro