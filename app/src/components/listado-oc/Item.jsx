import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center"><Link to={`/home/descripcion-oc/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-eye" aria-hidden="tdue"></i></Link> - 
                                                            <Link to={`/home/actualizar-oc-fecha/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-pencil" aria-hidden="tdue"></i></Link> 
                                                            {(this.props.datos.ESTADO == "En Proceso")?<Link to={`/home/recibir-oc/${this.props.datos.CODIGO_OC}`}> - <i class="fa fa-check-square" aria-hidden="tdue"></i></Link>:""}
            </td>
            <td>{this.props.datos.CODIGO_OC}</td>
            <td>{this.props.datos.ROCHA_PROYECTO}</td>
            <td>{this.props.datos.VERSION}</td>
            <td>{this.props.datos.NOMBRE_PROVEEDOR}</td>
            <td class="nr">{(this.props.datos.FECHA_REALIZACION)?this.props.datos.FECHA_REALIZACION.substring(0,10):this.props.datos.FECHA_REALIZACION}</td>
            <td class="nr">{(this.props.datos.FECHA_ENTREGA)?this.props.datos.FECHA_ENTREGA.substring(0,10):this.props.datos.FECHA_ENTREGA}</td>
            <td class="nr">{(this.props.datos.FECHA_CONFIRMACION)?this.props.datos.FECHA_CONFIRMACION.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</td>
            <td class="nr">{(this.props.datos.fecha_recibido)?this.props.datos.fecha_recibido.substring(0,10):this.props.datos.fecha_recibido}</td>
            <td>{this.props.datos.NOMBRE_USUARIO}</td>
            <td class="right">{this.props.datos.NETO}</td>
            <td>{this.props.datos.FACTURAS}</td>
            <td class="nr">{(this.props.datos.FECHA_ENVIO_VALIJA)?this.props.datos.FECHA_ENVIO_VALIJA.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</td>
            <td>{this.props.datos.ESTADO}</td>
        </tr>     
      )
  }

}

export default Item