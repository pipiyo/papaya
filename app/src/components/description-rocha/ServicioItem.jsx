import React from 'react'
import { Link } from 'react-router'
class ServicioItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr class={`${this.props.servicio.NOMBRE_SERVICIO.toLowerCase()}`}>
          <td class="center nr"><Link to={`/home/detalle-actividad/${this.props.servicio.CODIGO_SERVICIO}`}> <i class="fa fa-eye" aria-hidden="tdue"></i></Link>
                                {(this.props.servicio.ESTADO.toUpperCase() == "EN PROCESO")?<Link to={`/home/actualizar-actividad/${this.props.servicio.CODIGO_SERVICIO}`}> - <i class="fa fa-pencil" aria-hidden="tdue"></i></Link>:""}
          </td>
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