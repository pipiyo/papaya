import React from 'react'

class InformeRochaIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <div class="title">
            <h3>Informe Rocha</h3>
          </div>

          <div class="module-filter">
            <div class="item-filter">
                <label> Fecha Inicio </label>
                <input autoComplete="off" class="date" id="fechaInicio" type="text" />
            </div>
            <div class="item-filter">
                <label> Fecha Entrega </label>
                <input autoComplete="off" class="date" id="fechaEntrega" type="text" />
            </div>
            <div class="item-filter">
                <label> Código Rocha</label>
                <input autoComplete="off" id="codigo" type="text"/>
            </div>
            <div class="item-filter">
                <label> Estado</label>
                <select id="estado">
                    <option value="En Proceso">En Proceso</option>
                    <option value="ACTA">Acta</option>
                    <option value="OK">OK</option>
                    <option value="Nula">Nulo</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Vendedor</label>
                <select id="vendedor">
                    <option value="">Seleccione</option>
                    <option value="Amanda Godoy Santis">Amanda Godoy Santis</option>
                    <option value="Maria de los Angeles Nuñez Duarte">Maria de los Angeles Nuñez Duarte</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Categoría</label>
                <select id="categoria">
                    <option value="">Seleccione</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Solicitud">Solicitud</option>
                    <option value="Proceso">Proceso</option>
                </select>
            </div>
            <div class="item-filter">
                <label>Cliente</label>
                <input autoComplete="off" onChange={this.props.filtro} id="cliente" type="text"/>
            </div>
          </div>

          <div class="module-informe">
            <div class="item">
              <div class="title-informe">
                <h3>M&D 3030</h3>
                <a class="icon-informe"> <i class="fa fa-plus" aria-hidden="true"></i> </a>
              </div>
              <div class="content-informe">
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
              </div>
            </div>

            <div class="item">
              <div class="title-informe">
                <h3>M&D 3030</h3>
                <a class="icon-informe"> <i class="fa fa-plus" aria-hidden="true"></i> </a>
              </div>
              <div class="content-informe">
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
              </div>
            </div>
            
            <div class="item">
              <div class="title-informe">
                <h3>M&D 3030</h3>
                <a class="icon-informe"> <i class="fa fa-plus" aria-hidden="true"></i> </a>
              </div>
              <div class="content-informe">
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
                <div class="opc">
                  <h5>Fecha Entrega</h5>
                  <p>2010-12-12</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )

  }

}

export default InformeRochaIndex