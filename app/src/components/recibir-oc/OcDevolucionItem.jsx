import React from 'react'

class OcReciboItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td><p>{this.props.devolucion.codigo_producto}</p></td>
          <td><p>{this.props.devolucion.cantidad}</p></td>
          <td><p>{this.props.devolucion.motivo}</p></td>
          <td><p>{(this.props.devolucion.fecha)?this.props.devolucion.fecha.substring(0,10):this.props.devolucion.fecha}</p></td>
          <td><p>{this.props.devolucion.user}</p></td>
        </tr> 
      )

  }

}

export default OcReciboItem