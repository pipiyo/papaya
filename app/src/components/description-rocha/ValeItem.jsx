import React from 'react'

class ValeItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table-content">
          <div class="module-table-content-item">{this.props.vale.COD_VALE}</div>
          <div class="module-table-content-item a-center" >{this.props.vale.DEPARTAMENTO}</div>
          <div class="module-table-content-item">{(this.props.vale.FECHA)?this.props.vale.FECHA.substring(0,10):this.props.vale.FECHA}</div>
          <div class="module-table-content-item a-center">{(this.props.vale.FECHA_TERMINO)?this.props.vale.FECHA_TERMINO.substring(0,10):this.props.vale.FECHA_TERMINO}</div>
          <div class="module-table-content-item">{this.props.vale.EMPLEADO}</div>
          <div class="module-table-content-item">{this.props.vale.ESTADO}</div>
        </div> 
      )

  }

}

export default ValeItem