import React, { Component } from 'react'

class FiltroHijo extends Component {
  constructor() {
    super()
  }
  render() {
      return (
      <form onSubmit={ this.props.buscar } >

        <div class="module-filter">
            <div class="item-filter">
                <label>Código</label>
                <input autoComplete="off" id="codigo" type="text" />
            </div>
            <div class="item-filter">
                <label>Descripción</label>
                <input autoComplete="off" id="descripcion" type="text" />
            </div>


            <div className="item-filter ">
              <input id="btn-buscar" value="Buscar"  type="submit" />
            </div>
        </div>
      </form>
      )

  }

}

export default FiltroHijo