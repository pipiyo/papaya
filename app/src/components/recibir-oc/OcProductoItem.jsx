import React from 'react'

class OcProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td><p><input readOnly data-countoc="ok" id={`codigo-${this.props.number}`} value={this.props.codigo} /></p></td>
          <td><p>{this.props.producto.ROCHA}</p></td>
          <td><p>{this.props.producto.DESCRIPCION}</p></td>
          <td><p>{this.props.producto.OBSERVACION}</p></td>
          <td><p>{this.props.producto.STOCK_ACTUAL}</p></td>
          <td><p><input readOnly value={this.props.cantidad}  id={`cantidad-${this.props.number}`} /></p></td>
          <td><p><input class="active" onChange={this.props.renderInputOcTotal} id={`recibido-${this.props.number}`}  /></p></td>
          <td><p><input readOnly value={this.props.recibido} id={`entregado-${this.props.number}`} /></p></td>
          <td><p><input readOnly value={this.props.diferencia} id={`diferencia-${this.props.number}`} /></p></td>
          <td><p><input class="active" onChange={this.props.renderInputOc} value={this.props.guia} id={`guia-${this.props.number}`} /></p></td>
        </tr> 
      )

  }

}

export default OcProductoItem