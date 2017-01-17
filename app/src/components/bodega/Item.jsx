import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module_bodega_generico">
          <div class="module_bodega_generico_img">
            <img src="http://lorempixel.com/300/300/" alt="img" />
          </div>
          <div class="module_bodega_generico_des">
            <h2>Código: <p>{this.props.bodega.CODIGO_PRODUCTO}</p> </h2>
            <h2>Descripción: <p>{this.props.bodega.DESCRIPCION} ({this.props.bodega.CATEGORIA})</p></h2>
            <div class="module_bodega_generico_stock">
              <div><p>Stock Actual {this.props.bodega.STOCK_ACTUAL}</p></div>
              <div class="mm"><p>Stock Máximo {this.props.bodega.STOCK_MAXIMO}</p></div>
              <div class="mm"><p>Stock Mínimo {this.props.bodega.STOCK_MINIMO}</p></div>
            </div>
            <div class="module_bodega_generico_stock">
              <div class="cm"><p>OC Transito {this.props.bodega.TRANSITO}</p></div>
              <div class="cm"><p>Vale {this.props.bodega.VALE}</p></div>
              <div class="cm"><p>Contable {this.props.bodega.CONTABLE}</p></div>
              <div class="cm"><p>Disponible {this.props.bodega.DISPONIBLE}</p></div>
            </div>
            <div class="module_bodega_generico_icon">
              <div><Link class="icon-informe" to={`/home/producto/${this.props.bodega.CODIGO_PRODUCTO}`}><i class="fa fa-eye" aria-hidden="true"></i></Link></div>
              <div><Link class="icon-informe" to={`/home/actualizar-producto/${this.props.bodega.CODIGO_PRODUCTO}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link></div>
              <div><Link class="icon-informe" to={`/home/stock-producto/${this.props.bodega.CODIGO_PRODUCTO}`}><i class="fa fa-plus" aria-hidden="true"></i></Link></div>
            </div>   
          </div>
        </div> 
      )
  }
}

export default Item