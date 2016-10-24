import React from 'react'
import { Link } from 'react-router'

class Content extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="item-box" data-num={this.props.test}>
          <div class="item-rocha-info">
              <div class="opc">
                  <h5>Ejecutivo:</h5>
                  <p>Felipe Fernando Cavieres Belmar</p>
              </div>
              <div class="opc">
                  <h5>Fecha Emisión:</h5>
                  <p>2016-02-02</p>
              </div>
              <div class="opc">
                  <h5>Fecha entrega:</h5>
                  <p>2016-02-02</p>
              </div>
          </div>
                    
          <div class="item-actividades abastecimiento">
              <div class="title-actividad">
                  <h4><Link to="/home/detalle-actividad">10001</Link> - <a href="#"> LC-2015</a></h4> 
                  <p><Link to="/home/detalle-actividad"><i class="fa fa-eye" aria-hidden="true"></i></Link></p>
                  <p><a href=""><i class="fa fa-pencil" aria-hidden="true"></i></a></p>
              </div>
              <div class="description-actividad">
                  <div class="opc">
                      <h5>Descripción: </h5>
                      <p>Cajoneras Linea Bozz (2 Puestos).</p>
                  </div>
                  <div class="opc">
                      <h5>Cliente: </h5>
                      <p>AFP Planvital S.A.</p>
                  </div>
                  <div class="opc">
                      <h5>Fecha </h5>
                      <p>Desde 2016-05-19 / Hasta 2016-05-19 / Días 4</p>
                  </div>
              </div>
          </div>

          <div class="item-actividades produccion">
              <div class="title-actividad">
                  <h4><a href="#">1000</a> - <a href="#"> LC-2015</a></h4> 
                  <p><a href=""><i class="fa fa-eye" aria-hidden="true"></i></a></p>
                  <p><a href=""><i class="fa fa-pencil" aria-hidden="true"></i></a></p>
              </div>
              <div class="description-actividad">
                  <div class="opc">
                      <h5>Descripción: </h5>
                      <p>Cajoneras Linea Bozz (2 Puestos).</p>
                  </div>
                  <div class="opc">
                      <h5>Cliente: </h5>
                      <p>AFP Planvital S.A.</p>
                  </div>
                  <div class="opc">
                      <h5>Fecha </h5>
                      <p>Desde 2016-05-19 / Hasta 2016-05-19 / Días 4</p>
                  </div>
              </div>
          </div>

        </div> 
      )

  }

}

export default Content