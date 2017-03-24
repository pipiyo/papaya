import React from 'react'

class ValeProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <tr>
          <td><p><input readOnly data-countvale="ok" id={`codigo-${this.props.number}`} value={this.props.codigo} /></p></td>
          <td><p>{this.props.producto.DESCRIPCION}</p></td>
          <td><p>{this.props.producto.OBSERVACIONES}</p></td>
          <td><p><input readOnly value={this.props.stock}  id={`stock-${this.props.number}`} /> </p></td>
          <td><p><input readOnly value={this.props.cantidad}  id={`cantidad-${this.props.number}`} /></p></td>
          <td><p><input class="active" onChange={this.props.renderInputOcTotal} id={`recibido-${this.props.number}`}  /></p></td>
          <td><p><input readOnly value={this.props.recibido} id={`entregado-${this.props.number}`} /></p></td>
          <td><p><input readOnly value={this.props.diferencia} id={`diferencia-${this.props.number}`} /></p></td>
        </tr> 
      )

  }

}

export default ValeProductoItem