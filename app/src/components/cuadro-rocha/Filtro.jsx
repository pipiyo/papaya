import React from 'react'

class Filtro extends React.Component {
  constructor() {
    super()
  }
  render() {
      return (
      <form>
        <div class="module-filter">
          
            <div class="item-filter">
                <label>Código Rocha</label>
                <input autoComplete="off" id="rocha" type="text" />
            </div>
            <div class="item-filter">
                <label>Código Proyecto</label>
                <input autoComplete="off" id="proyecto" type="text" />
            </div>
            <div class="item-filter">
                <label>Rango +</label>
                <input autoComplete="off" id="rango1" type="number" />
            </div>
            <div class="item-filter">
                <label>Rango - </label>
                <input autoComplete="off" id="rango2" type="number" />
            </div>
            <div class="item-filter">
                <label>Ejecutivo</label>
                <select id="ejecutivo" >
                  <option value="">Seleccioné</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Cliente</label>
                <select id="cliente" >
                  <option value="">Seleccioné</option>
                </select>
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