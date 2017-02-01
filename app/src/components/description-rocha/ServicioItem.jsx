import React from 'react'

class ServicioItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class={`module-table-content ${this.props.servicio.NOMBRE_SERVICIO.toLowerCase()}`}>
          <div class="module-table-content-item">{this.props.servicio.NOMBRE_SERVICIO}</div>
          <div class="module-table-content-item a-center" >{this.props.servicio.CODIGO_SERVICIO}</div>
          <div class="module-table-content-item">{this.props.servicio.SD}</div>
          <div class="module-table-content-item a-center">{this.props.servicio.FECHA_INICIO.substring(0,10)}</div>
          <div class="module-table-content-item a-center">{this.props.servicio.FECHA_ENTREGA.substring(0,10)}</div>
          <div class="module-table-content-item">{this.props.servicio.OBSERVACIONES}</div>
          <div class="module-table-content-item">{this.props.servicio.ESTADO}</div>
        </div> 
      )

  }

}

export default ServicioItem