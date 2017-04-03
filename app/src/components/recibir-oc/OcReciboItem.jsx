import React from 'react'

class OcReciboItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td><p>{this.props.recibo.codigo_producto}</p></td>
          <td><p>{this.props.recibo.total}</p></td>
          <td><p>{(this.props.recibo.fecha_recibido)?this.props.recibo.fecha_recibido.substring(0,10):this.props.recibo.fecha_recibido}</p></td>
          <td><p>{this.props.recibo.recibido}</p></td>
          <td><p>{this.props.recibo.user}</p></td>
        </tr> 
      )

  }

}

export default OcReciboItem