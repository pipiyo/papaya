import React, { Component } from 'react'

class Filtro extends Component {
  constructor() {
    super()
  }
  render() {
      //console.log( this.props.obj.colores )
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
            <div class="item-filter">
                <label>Pais</label>
                <input autoComplete="off" id="pais" type="text" />
            </div>
            <div class="item-filter">
                <label>Proveedor</label>
                <input autoComplete="off" id="proveedor" type="text" />
            </div>
            <div class="item-filter">
                <label>modelo</label>
                <input autoComplete="off" id="modelo" type="text" />
            </div>
            <div class="item-filter">
                <label>Mecanismo</label>
                <input autoComplete="off" id="mecanismo" type="text" />
            </div>
            <div class="item-filter">
                <label>Respaldo</label>
                <input autoComplete="off" id="respaldo" type="text" />
            </div>
            
            <div class="item-filter">
                <label>Categoria</label>
                <select id="categoria" >
                    <option value="">Seleccione</option>
                    <option value="20">Silla</option>
                    <option value="21">Insumo Silla</option>
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