import React from 'react'

class OcProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td><p>{this.props.producto.CODIGO_PRODUCTO}</p></td>
          <td><p>{this.props.producto.ROCHA}</p></td>
          <td><p>{this.props.producto.DESCRIPCION}</p></td>
          <td><p>{this.props.producto.OBSERVACION}</p></td>
          <td><p>{this.props.producto.STOCK_ACTUAL}</p></td>
          <td><p>{this.props.producto.CANTIDAD}</p></td>
          <td><p>{this.props.producto.PRECIO_BODEGA}</p></td>
          <td><p>{this.props.producto.PRECIO_UNITARIO}</p></td>
          <td><p>{this.props.producto.PRECIO_LISTA}</p></td>
          <td><p>{this.props.producto.DESCUENTO}</p></td>
          <td><p>{this.props.producto.TOTAL}</p></td>
        </tr> 
      )

  }

}

export default OcProductoItem