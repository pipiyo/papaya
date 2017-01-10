import React from 'react'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <div class="module-table-content">
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_PROYECTO}</div>
            <div class="module-table-content-item">{this.props.datos.NOMBRE_CLIENTE}</div>
            <div class="module-table-content-item">{this.props.datos.EJECUTIVO}</div>
            <div class="module-table-content-item a-right">{this.props.datos.CODIGO_SERVICIO}</div>
            <div class="module-table-content-item">{this.props.datos.SD}</div>
            <div class="module-table-content-item a-right">{this.props.datos.CODIGO_SUBSERVICIO}</div>
            <div class="module-table-content-item">{this.props.datos.SSD}</div>
            <div class="module-table-content-item a-center">{this.props.datos.SUB_FECHA_INICIO.substring(0,10)}</div>
            <div class="module-table-content-item a-center">{this.props.datos.SUB_FECHA_ENTREGA.substring(0,10)}</div>
            <div class="module-table-content-item">{this.props.datos.SUB_OBSERVACIONES}</div>
            <div class="module-table-content-item">{this.props.datos.SUB_ESTADO}</div>
        </div>     
      )
  }

}

export default Item