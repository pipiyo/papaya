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
             <input type="text" class="date" />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <input type="text" class="date" />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input type="text" />
          </div>
          <div class="item-filter">
              <label> Reclamo</label>
              <input type="text" />
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select>
                  <option>En Proceso</option>
                  <option>OK</option>
                  <option>Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select>
                  <option>En Proceso</option>
                  <option>OK</option>
                  <option>Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select>
                  <option>En Proceso</option>
                  <option>OK</option>
                  <option>Nulo</option>
              </select>
          </div>
        </div>
      )

  }

}

export default Filtro