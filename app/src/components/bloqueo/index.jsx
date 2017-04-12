import React, { Component } from 'react'

import Filtro from './Filtro'
import Title from './Title'

class BloqueoIndex extends Component {

  constructor() {
    super()
  }
  render() {

      return (         
        <div>
          <Title />
          <Filtro />

          <div class="module-arrow">
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
          </div>
           
          <div class="module-cuadro-rocha">
            <div class="module-cuadro-rocha-phone">

              <div class="content-rocha-info">

                <div class="item">



                </div>

              </div>

              <div class="content-rocha-day" id="tabla-cuadro-rocha">

                <div class="item">
                  
                </div>

              </div>


            </div>
          </div>

        </div>
      )

  }

}

export default BloqueoIndex