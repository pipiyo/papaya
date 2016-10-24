import React from 'react'

class SubActividad extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="item-actividades abastecimiento">
          <div class="title-actividad">
            <h4>10001 -  LC-2015</h4> 
            <p><a href=""><i class="fa fa-pencil" aria-hidden="true"></i></a></p>
          </div>
          <div class="description-actividad">
            <div class="opc sub">
              <h5>Descripción: </h5>
              <p>Cajoneras Linea Bozz (2 Puestos).</p>
            </div>
            <div class="opc sub">
              <h5>Cliente: </h5>
              <p>AFP Planvital S.A.</p>
            </div>
            <div class="opc sub">
              <h5>Observación: </h5>
              <p>Pocas cosas</p>
            </div>
            <div class="opc sub">
              <h5>Fecha </h5>
              <p>Desde 2016-05-19 / Hasta 2016-05-19 / Días 4</p>
            </div>
          </div>
        </div>
      )

  }

}

export default SubActividad