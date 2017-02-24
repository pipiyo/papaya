import React from 'react'
import ValeProductoItem from './ValeProductoItem'

class ValeProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table vale top" data-col="ocho" data-area="ok">
          <div class="module-table-container">
            <div class="module-table-content">
              <div class="module-table-item">Código</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Observaciones</div>
              <div class="module-table-item">Stock</div>
              <div class="module-table-item">Cantidad</div>
              <div class="module-table-item">Recibido</div>
              <div class="module-table-item">Entregado</div>
              <div class="module-table-item">Diferencia</div>
            </div>
              {
                this.props.obj.renderProductos.map( (producto,i) => {
                  return <ValeProductoItem 
                  key={i}
                  number={i}
                  renderInputOcTotal={this.props.renderInputOcTotal} 
                  renderInputOc={this.props.renderInputOc}  
                  stock= {this.props.obj.stock[i]} 
                  diferencia= {this.props.obj.diferencia[i]} 
                  recibido= {this.props.obj.recibido[i]} 
                  cantidad= {this.props.obj.cantidad[i]}
                  codigo= {this.props.obj.codigos[i]}
                  producto={producto} />
                })
              }
          </div>
        </div>
      )

  }

}

export default ValeProducto