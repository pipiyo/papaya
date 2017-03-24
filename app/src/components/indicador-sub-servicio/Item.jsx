import React from 'react'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td>{this.props.datos.CODIGO_PROYECTO}</td>
            <td>{this.props.datos.NOMBRE_CLIENTE}</td>
            <td>{this.props.datos.EJECUTIVO}</td>
            <td>{this.props.datos.CODIGO_SERVICIO}</td>
            <td>{this.props.datos.SD}</td>
            <td>{this.props.datos.CODIGO_SUBSERVICIO}</td>
            <td>{this.props.datos.SSD}</td>
            <td class="nr">{this.props.datos.SUB_FECHA_INICIO.substring(0,10)}</td>
            <td class="nr">{this.props.datos.SUB_FECHA_ENTREGA.substring(0,10)}</td>
            <td>{this.props.datos.SUB_OBSERVACIONES}</td>
            <td>{this.props.datos.SUB_ESTADO}</td>
        </tr>     
      )
  }

}

export default Item