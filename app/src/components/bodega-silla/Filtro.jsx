import React, { Component } from 'react'


export class FiltroColores extends Component {
  constructor() {
    super()
  }
  render() {
      return (
            <div class="item-filter">
                <label>Colores</label>
                <select id="color" >
                    <option value="">Seleccione</option>
                    {
                      this.props.colores.map( (color) => {
                        return <option value={color._id} key={color._id}>{color.name}</option>
                      })
                    }
                </select>
            </div>
      )

  }

}



class Filtro extends Component {
  constructor() {
    super()
  }
  render() {
      //console.log( this.props.obj.colores )
      return (
      <form onSubmit={ this.props.obj } >
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