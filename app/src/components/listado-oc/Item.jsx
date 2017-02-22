import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <div class="module-table-content">
            <div class="module-table-content-item a-center"><Link to={`/home/descripcion-oc/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-eye" aria-hidden="true"></i></Link> - 
                                                            <Link to={`/home/actualizar-oc-fecha/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-pencil" aria-hidden="true"></i></Link> - 
                                                            <Link to={`/home/recibir-oc/${this.props.datos.CODIGO_OC}`}> <i class="fa fa-check-square" aria-hidden="true"></i></Link>
            </div>
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_OC}</div>
            <div class="module-table-content-item a-center">{this.props.datos.ROCHA_PROYECTO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.VERSION}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NOMBRE_PROVEEDOR}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_REALIZACION)?this.props.datos.FECHA_REALIZACION.substring(0,10):this.props.datos.FECHA_REALIZACION}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_ENTREGA)?this.props.datos.FECHA_ENTREGA.substring(0,10):this.props.datos.FECHA_ENTREGA}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_CONFIRMACION)?this.props.datos.FECHA_CONFIRMACION.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.fecha_recibido)?this.props.datos.fecha_recibido.substring(0,10):this.props.datos.fecha_recibido}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NOMBRE_USUARIO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NETO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.FACTURAS}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_ENVIO_VALIJA)?this.props.datos.FECHA_ENVIO_VALIJA.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</div>
            <div class="module-table-content-item a-center">{this.props.datos.ESTADO}</div>
        </div>     
      )
  }

}

export default Item