import React from 'react'

class OcProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table-content">
          <div class="module-table-content-item"><p>{this.props.producto.CODIGO_PRODUCTO}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.ROCHA}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.DESCRIPCION}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.OBSERVACION}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.STOCK_ACTUAL}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.CANTIDAD}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.PRECIO_BODEGA}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.PRECIO_UNITARIO}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.PRECIO_LISTA}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.DESCUENTO}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.TOTAL}</p></div>
        </div> 
      )

  }

}

export default OcProductoItem