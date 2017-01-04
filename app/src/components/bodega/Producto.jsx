import React from 'react'

class Producto extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="module_bodega">
          {
            this.props.bodega.map( (bodega,i) => {
              return( 
                <div key={i} class="module_bodega_generico">
                  <div class="module_bodega_generico_img">
                    <img src="http://lorempixel.com/300/300/" alt="img" />
                  </div>
                  <div class="module_bodega_generico_des">
                    <h2>Código: <p>{bodega.CODIGO_PRODUCTO}</p> </h2>
                    <h2>Descripción: <p>{bodega.DESCRIPCION} ({bodega.CATEGORIA})</p></h2>
                    <div class="module_bodega_generico_stock">
                      <div><p>Stock Actual {bodega.STOCK_ACTUAL}</p></div>
                      <div class="mm"><p>Stock Máximo {bodega.STOCK_MAXIMO}</p></div>
                      <div class="mm"><p>Stock Mínimo {bodega.STOCK_MINIMO}</p></div>
                    </div>
                    <div class="module_bodega_generico_stock">
                      <div class="cm"><p>OC Transito {bodega.TRANSITO}</p></div>
                      <div class="cm"><p>Vale {bodega.VALE}</p></div>
                      <div class="cm"><p>Contable {parseInt(bodega.STOCK_ACTUAL) + parseInt(bodega.TRANSITO)}</p></div>
                      <div class="cm"><p>Disponible {parseInt(bodega.STOCK_ACTUAL) + parseInt(bodega.TRANSITO) - parseInt(bodega.VALE)}</p></div>
                    </div>
                    <div class="module_bodega_generico_icon">
                      <div><a><i class="fa fa-eye" aria-hidden="true"></i></a></div>
                      <div><a><i class="fa fa-plus-square" aria-hidden="true"></i></a></div>
                      <div><a><i class="fa fa-minus-square" aria-hidden="true"></i></a></div>
                    </div>   
                  </div>
                </div>
              )
            })
          }
        </div>
      )

  }

}

export default Producto