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
              <input autoComplete="off" id="codigo" type="text" onChange={this.props.renderFiltro}/>
          </div>
          <div class="item-filter">
              <label>Descripción</label>
              <input autoComplete="off" id="descripcion" type="text" onChange={this.props.renderFiltro} />
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select id="categoria" onChange={this.props.renderFiltro}>
                  {
                    this.props.obj.categoria.map( (i) => {
                      return <option value={`${i}`} key={`${i}`}>{`${i}`}</option>
                    })
                  }
              </select>
          </div>
          <div className="item-filter opc" >
            <input onChange={this.props.renderFiltro} type="checkbox" id="check-quiebre" name="check-quiebre" value="quiebre"/>
            <label class="checkbox" for="check-quiebre"></label>
            <label class="name-check">Quiebre</label>
          </div>
          <div className="item-filter opc">
            <input onChange={this.props.renderFiltro} type="checkbox" id="check-desactivado" name="check-desactivado" value="desactivado"/>
            <label class="checkbox" for="check-desactivado"></label>
            <label class="name-check">Desactivados</label>
          </div>
            
        </div>
      )

  }

}

export default Filtro