import React from 'react'

class ServicioItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr class={`${this.props.servicio.NOMBRE_SERVICIO.toLowerCase()}`}>
          <td>{this.props.servicio.NOMBRE_SERVICIO}</td>
          <td>{this.props.servicio.CODIGO_SERVICIO}</td>
          <td>{this.props.servicio.SD}</td>
          <td>{this.props.servicio.FECHA_INICIO.substring(0,10)}</td>
          <td>{this.props.servicio.FECHA_ENTREGA.substring(0,10)}</td>
          <td>{this.props.servicio.OBSERVACIONES}</td>
          <td>{this.props.servicio.ESTADO}</td>
        </tr> 
      )

  }

}

export default ServicioItem