import React from 'react'

class Filtro extends React.Component {
  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-filter">

          <div class="item-filter">
              <label>Código</label>
              <input autoComplete="off" id="codigo" type="text"/>
          </div>
          <div class="item-filter">
              <label>Descripción</label>
              <input autoComplete="off" id="descripcion" type="text"/>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select id="estado">
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="Emitido">Emitido</option>
                  <option value="Parcial">Parcial</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div className="item-filter opc">
            <input type="checkbox" id="check-quiebre" name="check-quiebre" value="quiebre"/>
            <label class="checkbox" for="check-quiebre"></label>
            <label class="name-check">Quiebre de stock</label>
          </div>
            
        </div>
      )

  }

}

export default Filtro