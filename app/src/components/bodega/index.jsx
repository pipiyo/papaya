import React from 'react'
import Filtro from './Filtro'
import Title from './Title'

class BodegaIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Filtro />
          
          <div class="module_bodega">
            <div class="module_bodega_generico">
              <div class="module_bodega_generico_img">
                <img src="http://lorempixel.com/300/300/" alt="img" />
              </div>
              <div class="module_bodega_generico_des">
                <h2>Código: <p>E.LD-2046_4</p> </h2>
                <h2>Descripción: <p>SPINE DOB. ARCHIV CORRED, CASTAÑO (ACTIU)</p></h2>
                <div class="module_bodega_generico_stock">
                  <div><p>Stock Actual 10</p></div>
                  <div class="mm"><p>Stock Máximo 3</p></div>
                  <div class="mm"><p>Stock Mínimo 2</p></div>
                </div>
                <div class="module_bodega_generico_icon">
                  <div><a><i class="fa fa-eye" aria-hidden="true"></i></a></div>
                  <div><a><i class="fa fa-plus-square" aria-hidden="true"></i></a></div>
                  <div><a><i class="fa fa-minus-square" aria-hidden="true"></i></a></div>
                </div>   
              </div>
              
            </div>

            <div class="module_bodega_generico">
              <div class="module_bodega_generico_img">
                <img src="http://lorempixel.com/300/300/" alt="img" />
              </div>
              <div class="module_bodega_generico_des">
                <h2>Código: <p>E.LD-2046_4</p> </h2>
                <h2>Descripción: <p>SPINE DOB. ARCHIV CORRED, CASTAÑO (ACTIU)</p></h2>
                <div class="module_bodega_generico_stock">
                  <div><p>Stock Actual 10</p></div>
                  <div class="mm"><p>Stock Máximo 2</p></div>
                  <div class="mm"><p>Stock Mínimo 2</p></div>
                </div> 
                <div class="module_bodega_generico_icon">
                  <div><a><i class="fa fa-eye" aria-hidden="true"></i></a></div>
                  <div><a><i class="fa fa-plus-square" aria-hidden="true"></i></a></div>
                  <div><a><i class="fa fa-minus-square" aria-hidden="true"></i></a></div>
                </div>  
              </div>
            </div>
          </div>

        </div>
      )

  }

}

export default BodegaIndex