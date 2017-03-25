import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center nr">
                                {(this.props.datos.SUB_ESTADO.toUpperCase() == "EN PROCESO")?<Link to={`/home/actualizar-subactividad/${this.props.datos.CODIGO_SUBSERVICIO}`}> <i class="fa fa-pencil" aria-hidden="tdue"></i></Link>:""}
            </td>
            <td>{this.props.datos.CODIGO_PROYECTO}</td>
            <td>{this.props.datos.NOMBRE_CLIENTE}</td>
            <td>{this.props.datos.EJECUTIVO}</td>
            <td>{this.props.datos.CODIGO_SERVICIO}</td>
            <td>{this.props.datos.SD}</td>
            <td>{this.props.datos.CODIGO_SUBSERVICIO}</td>
            <td>{this.props.datos.SSD}</td>
            <td class="nr center">{this.props.datos.SUB_FECHA_INICIO.substring(0,10)}</td>
            <td class={(this.props.datos.SUB_FECHA_ENTREGA.substring(0,10) < this.props.fecha)?`nr error center`:`nr center`}>{this.props.datos.SUB_FECHA_ENTREGA.substring(0,10)}</td>
            <td>{this.props.datos.SUB_OBSERVACIONES}</td>
            <td>{this.props.datos.SUB_ESTADO}</td>
        </tr>     
      )
  }

}

export default Item