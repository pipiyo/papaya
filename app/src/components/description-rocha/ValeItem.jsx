import React from 'react'

class ValeItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td>{this.props.vale.COD_VALE}</td>
          <td>{this.props.vale.DEPARTAMENTO}</td>
          <td>{(this.props.vale.FECHA)?this.props.vale.FECHA.substring(0,10):this.props.vale.FECHA}</td>
          <td>{(this.props.vale.FECHA_TERMINO)?this.props.vale.FECHA_TERMINO.substring(0,10):this.props.vale.FECHA_TERMINO}</td>
          <td>{this.props.vale.EMPLEADO}</td>
          <td>{this.props.vale.ESTADO}</td>
        </tr>
      )

  }

}

export default ValeItem