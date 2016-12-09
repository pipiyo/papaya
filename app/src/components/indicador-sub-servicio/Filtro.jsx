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
              <input type="text" autoComplete="off" class="date" id="fechaInicio"  />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <input type="text" autoComplete="off" class="date" id="fechaEntrega" />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input autoComplete="off" id="codigo" type="text"/>
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select  id="estado">
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
              </select>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select id="categoria">
                  <option value="">Seleccione</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Solicitud">Solicitud</option>
                  <option value="Proceso">Proceso</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Cliente</label>
              <input autoComplete="off" id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro