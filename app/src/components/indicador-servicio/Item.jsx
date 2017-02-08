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
            <div class="module-table-content-item a-center">{this.props.datos.FECHA_INICIO.substring(0,10)}</div>
            <div class="module-table-content-item a-center">{this.props.datos.FECHA_ENTREGA.substring(0,10)}</div>
            <div class="module-table-content-item">{this.props.datos.OBSERVACIONES}</div>
            <div class="module-table-content-item">{this.props.datos.ESTADO}</div>
        </div>     
      )
  }

}

export default Item