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
                <label>Código OC</label>
                <input autoComplete="off" id="codigo" type="text" />
            </div>
            <div class="item-filter">
                <label>Rocha</label>
                <input autoComplete="off" id="rocha" type="text" />
            </div>
            <div class="item-filter">
                <label>Proveedor</label>
                <select id="proveedor" >
                  <option value="">Seleccioné</option>
                  {
                    this.props.obj.proveedor.map( (proveedor) => {
                      return <option value={`${proveedor.RAZON_SOCIAL}`} key={`${proveedor.RAZON_SOCIAL}`}>{`${proveedor.RAZON_SOCIAL}`}</option>
                    })
                  }
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