import React, { Component } from 'react'

class Filtro extends Component {
  constructor() {
    super()
  }
  render() {

      return (
      <form onSubmit={this.props.buscar} >
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
                <label>Ejecutivo</label>

                <select id="ejecutivo" >
                  <option value="">Seleccioné</option>
                    {
                      this.props.obj.ejecutivo.map( (v, k) => {
                        return( <option key={k} value={v.ejecutivo}>{v.ejecutivo}</option> )
                      })
                    }
                </select>

            </div>
            <div class="item-filter">
                <label>Cliente</label>
                <input autoComplete="off" id="cliente" type="text" />
            </div>


            <div class="item-filter">
                <label>Estado</label>

                <select id="estado" >
                  <option value="EN PROCESO">En Proceso</option>
                  <option value="OK">Ok</option>
                  <option value="NULA">Nulo</option>
                  <option value="ACTA">Acta</option>
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