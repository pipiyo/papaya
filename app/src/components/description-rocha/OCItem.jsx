import React from 'react'

class OCItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td>{this.props.oc.CODIGO_OC}</td>
          <td>{this.props.oc.NOMBRE_PROVEEDOR}</td>
          <td>{(this.props.oc.FECHA_REALIZACION)?this.props.oc.FECHA_REALIZACION.substring(0,10):this.props.oc.FECHA_REALIZACION}</td>
          <td>{(this.props.oc.FECHA_ENTREGA)?this.props.oc.FECHA_ENTREGA.substring(0,10):this.props.oc.FECHA_ENTREGA}</td>
          <td>{(this.props.oc.FECHA_CONFIRMACION)?this.props.oc.FECHA_CONFIRMACION.substring(0,10):this.props.oc.FECHA_CONFIRMACION}</td>
          <td>{this.props.oc.RECLAMO}</td>
          <td>{this.props.oc.ESTADO}</td>
          <td>{this.props.oc.TOTAL}</td>
        </tr> 
      )

  }

}

export default OCItem