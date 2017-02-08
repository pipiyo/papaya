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
            
            <div class="item-filter">
                <label>Superficies</label>
                <select id="superficie" onChange={this.props.obj.filtrarColores}>
                    <option value="x">Seleccione</option>
                    {
                      this.props.obj.superficies.map( (superficie) => {
                        return <option value={superficie._id} key={superficie._id}>{superficie.name}</option>
                      })
                    }
                </select>
            </div>

            {this.props.obj.colores}

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