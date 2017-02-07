import React from 'react'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <div class="module-table-content">
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_OC}</div>
            <div class="module-table-content-item a-center">{this.props.datos.ROCHA_PROYECTO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.VERSION}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NOMBRE_PROVEEDOR}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_REALIZACION)?this.props.datos.FECHA_REALIZACION.substring(0,10):this.props.datos.FECHA_REALIZACION}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_ENTREGA)?this.props.datos.FECHA_ENTREGA.substring(0,10):this.props.datos.FECHA_ENTREGA}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_CONFIRMACION)?this.props.datos.FECHA_CONFIRMACION.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</div>
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_USUARIO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NETO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.FACTURAS}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_ENVIO_VALIJA)?this.props.datos.FECHA_ENVIO_VALIJA.substring(0,10):this.props.datos.FECHA_CONFIRMACION}</div>
            <div class="module-table-content-item a-center">OK</div>
            <div class="module-table-content-item a-center">{this.props.datos.ESTADO}</div>
        </div>     
      )
  }

}

export default Item