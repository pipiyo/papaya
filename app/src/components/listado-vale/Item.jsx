import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center">
              <Link to={`/home/recibir-vale/${this.props.datos.COD_VALE}`}> <i class="fa fa-check-square" aria-hidden="true"></i></Link>
            </td>
            <td>{this.props.datos.COD_VALE}</td>
            <td>{this.props.datos.CODIGO_PROYECTO}</td>
            <td>{this.props.datos.DEPARTAMENTO}</td>
            <td>{this.props.datos.CODIGO_PROYECTO}</td>
            <td class="nr">{(this.props.datos.FECHA)?this.props.datos.FECHA.substring(0,10):this.props.datos.FECHA}</td>
            <td class="nr">{(this.props.datos.FECHA_TERMINO)?this.props.datos.FECHA_TERMINO.substring(0,10):this.props.datos.FECHA_TERMINO}</td>
            <td>{this.props.datos.NOMBRE_USUARIO}</td>
            <td>{this.props.datos.ESTADO}</td>
        </tr>     
      )
  }

}

export default Item