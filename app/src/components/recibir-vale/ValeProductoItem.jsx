import React from 'react'

class ValeProductoItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table-content">
          <div class="module-table-content-item"><p><input readOnly data-countvale="ok" class="bordernone" id={`codigo-${this.props.number}`} value={this.props.codigo} /></p></div>
          <div class="module-table-content-item"><p>{this.props.producto.DESCRIPCION}</p></div>
          <div class="module-table-content-item"><p>{this.props.producto.OBSERVACIONES}</p></div>
          <div class="module-table-content-item"><p><input class="bordernone" readOnly value={this.props.stock}  id={`stock-${this.props.number}`} /> </p></div>
          <div class="module-table-content-item"><p><input class="bordernone" readOnly value={this.props.cantidad}  id={`cantidad-${this.props.number}`} /></p></div>
          <div class="module-table-content-item"><p><input onChange={this.props.renderInputOcTotal} id={`recibido-${this.props.number}`}  /></p></div>
          <div class="module-table-content-item"><p><input class="bordernone" readOnly value={this.props.recibido} id={`entregado-${this.props.number}`} /></p></div>
          <div class="module-table-content-item"><p><input class="bordernone" readOnly value={this.props.diferencia} id={`diferencia-${this.props.number}`} /></p></div>
        </div> 
      )

  }

}

export default ValeProductoItem