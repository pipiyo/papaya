import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center nr"><Link to={`/home/detalle-actividad/${this.props.datos.CODIGO_SERVICIO}`}> <i class="fa fa-eye" aria-hidden="tdue"></i></Link>
                                {(this.props.datos.ESTADO.toUpperCase() == "EN PROCESO")?<Link to={`/home/actualizar-actividad/${this.props.datos.CODIGO_SERVICIO}`}> - <i class="fa fa-pencil" aria-hidden="tdue"></i></Link>:""}
            </td>
            <td>{this.props.datos.CODIGO_PROYECTO}</td>
            <td>{this.props.datos.NOMBRE_CLIENTE}</td>
            <td>{this.props.datos.EJECUTIVO}</td>
            <td>{this.props.datos.CODIGO_SERVICIO}</td>
            <td>{this.props.datos.SD}</td>
            <td class="nr center">{this.props.datos.FECHA_INICIO.substring(0,10)}</td>
            <td class={(this.props.datos.FECHA_ENTREGA.substring(0,10) < this.props.fecha)?`nr error center`:`nr`} >{this.props.datos.FECHA_ENTREGA.substring(0,10)}</td>
            <td>{this.props.datos.OBSERVACIONES}</td>
            <td>{this.props.datos.ESTADO}</td>
        </tr>     
      )
  }

}

export default Item