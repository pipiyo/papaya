import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends React.Component {

  constructor(props) {
    super()
     this.state = {fechaInicio:props.fechaInicio,fechaEntrega:props.fechaEntrega}
  }

  render() {
      return (
        <div class="module-filter">
          <div class="item-filter">
              <label> Fecha Inicio </label>
              
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input autoComplete="off" id="codigo" type="text"  />
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select id="estado">
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
              <label>Cliente</label>
              <input autoComplete="off"  id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro