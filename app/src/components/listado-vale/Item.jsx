import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <div class="module-table-content">
            <div class="module-table-content-item a-center">
              <Link to={`/home/recibir-vale/${this.props.datos.COD_VALE}`}> <i class="fa fa-check-square" aria-hidden="true"></i></Link>
            </div>
            <div class="module-table-content-item a-center">{this.props.datos.COD_VALE}</div>
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_PROYECTO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.DEPARTAMENTO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.CODIGO_PROYECTO}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA)?this.props.datos.FECHA.substring(0,10):this.props.datos.FECHA}</div>
            <div class="module-table-content-item a-center">{(this.props.datos.FECHA_TERMINO)?this.props.datos.FECHA_TERMINO.substring(0,10):this.props.datos.FECHA_TERMINO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.NOMBRE_USUARIO}</div>
            <div class="module-table-content-item a-center">{this.props.datos.ESTADO}</div>
        </div>     
      )
  }

}

export default Item