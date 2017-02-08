import React from 'react'

class OCItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table-content">
          <div class="module-table-content-item">{this.props.oc.CODIGO_OC}</div>
          <div class="module-table-content-item a-center" >{this.props.oc.NOMBRE_PROVEEDOR}</div>
          <div class="module-table-content-item">{(this.props.oc.FECHA_REALIZACION)?this.props.oc.FECHA_REALIZACION.substring(0,10):this.props.oc.FECHA_REALIZACION}</div>
          <div class="module-table-content-item a-center">{(this.props.oc.FECHA_ENTREGA)?this.props.oc.FECHA_ENTREGA.substring(0,10):this.props.oc.FECHA_ENTREGA}</div>
          <div class="module-table-content-item a-center">{(this.props.oc.FECHA_CONFIRMACION)?this.props.oc.FECHA_CONFIRMACION.substring(0,10):this.props.oc.FECHA_CONFIRMACION}</div>
          <div class="module-table-content-item">{this.props.oc.RECLAMO}</div>
          <div class="module-table-content-item">{this.props.oc.ESTADO}</div>
          <div class="module-table-content-item">{this.props.oc.TOTAL}</div>
        </div> 
      )

  }

}

export default OCItem