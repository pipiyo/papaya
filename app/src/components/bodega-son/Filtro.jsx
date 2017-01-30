import React, { Component } from 'react'

class Filtro extends Component {
  constructor() {
    super()
  }
  render() {
      return (
      <form>
        <div class="module-filter">
          
            <div class="item-filter">
                <label>Código</label>
                <input autoComplete="off" id="codigo" type="text" />
            </div>
            <div class="item-filter">
                <label>Descripción</label>
                <input autoComplete="off" id="descripcion" type="text" />
            </div>
            <div className="item-filter opc" >
              <input type="checkbox" id="check-quiebre" name="check-quiebre" value="quiebre"/>
              <label class="checkbox" for="check-quiebre"></label>
              <label class="name-check">Quiebre</label>
            </div>
            <div className="item-filter opc">
              <input type="checkbox" id="check-desactivado" name="check-desactivado" value="desactivado"/>
              <label class="checkbox" for="check-desactivado"></label>
              <label class="name-check">Desactivados</label>
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