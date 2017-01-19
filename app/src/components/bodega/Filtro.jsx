import React from 'react'

class Filtro extends React.Component {
  constructor() {
    super()
  }
  render() {
      return (
      <form onSubmit={this.props.renderFiltro}>
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
                <label>Categoría</label>
                <select id="categoria" >
                  <option value="">Seleccioné</option>
                    {
                      this.props.obj.categoria.map( (i) => {
                        return <option value={`${i.id}`} key={`${i.id}`}>{`${i.name}`}</option>
                      })
                    }
                </select>
            </div>
            <div className="item-filter opc" >
              <input type="checkbox" id="check-bodega" name="check-bodega" value="bodega"/>
              <label class="checkbox" for="check-bodega"></label>
              <label class="name-check">Bodega 2</label>
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