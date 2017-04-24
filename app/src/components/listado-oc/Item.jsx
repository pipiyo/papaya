import React from 'react'
import { Link } from 'react-router'
import format from 'format-number'
import Env from '../../Config'
let myFormat = format({integerSeparator:'.',decimal: ','})

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center nr"><Link to={`/home/descripcion-oc/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-eye" aria-hidden="tdue"></i></Link> -
                                                            <Link to={`/home/actualizar-oc-fecha/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-pencil" aria-hidden="tdue"></i></Link>
                                                            {(this.props.datos.ESTADO == "En Proceso")?<Link to={`/home/recibir-oc/${this.props.datos.CODIGO_OC}`}> - <i class="fa fa-check-square" aria-hidden="true"></i></Link>:""}
                                                            {(this.props.datos.ESTADO != "Pendiente")?<a target='_blank' href={`${Env.urlSytem1}pdfOC.php?CODIGO_OC=${this.props.datos.CODIGO_OC}`}> - <i class="fa fa-file-text" aria-hidden="true"></i></a>:""}
                                                            {(this.props.datos.ESTADO == "Pendiente")?<Link to={`/home/actualizar-oc/${this.props.datos.CODIGO_OC}`}> - <i class="fa fa-pencil-square-o" aria-hidden="true"></i></Link>:""}
            </td>
            <td class={(this.props.datos.ENVIADO)?`nr ok center`:`nr center`}>{this.props.datos.CODIGO_OC}</td>
            <td>{this.props.datos.ROCHA_PROYECTO}</td>
            <td>{this.props.datos.VERSION}</td>
            <td>{this.props.datos.NOMBRE_PROVEEDOR}</td>
            <td class="nr center">{(this.props.datos.FECHA_REALIZACION)?this.props.datos.FECHA_REALIZACION.substring(0,10):this.props.datos.FECHA_REALIZACION}</td>
            <td class="nr center">{(this.props.datos.FECHA_ENTREGA)?this.props.datos.FECHA_ENTREGA.substring(0,10):this.props.datos.FECHA_ENTREGA}</td>
            <td class={(this.props.datos.FECHA_CONFIRMACION < this.props.fecha || !this.props.datos.FECHA_CONFIRMACION)?`nr error center`:`nr center`}>{(this.props.datos.FECHA_CONFIRMACION)?this.props.datos.FECHA_CONFIRMACION.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</td>
            <td class="nr center">{(this.props.datos.fecha_recibido)?this.props.datos.fecha_recibido.substring(0,10):this.props.datos.fecha_recibido}</td>
            <td>{this.props.datos.CODIGO_USUARIO}</td>
            <td class="right">{myFormat(this.props.datos.NETO)}</td>
            <td>{this.props.datos.FACTURAS}</td>
            <td class="nr">{(this.props.datos.FECHA_ENVIO_VALIJA)?this.props.datos.FECHA_ENVIO_VALIJA.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</td>
            <td>{this.props.datos.ESTADO}</td>
        </tr>     
      )
  }

}

export default Item