import React from 'react'
import ValeProductoItem from './ValeProductoItem'

class ValeProducto extends React.Component {

  constructor() {
    super()
  }
  render() {

      return (
        <div>
          <div class="module-table-new">
            <table class="vale">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Observaciones</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th>Recibido</th>
                    <th>Entregado</th>
                    <th>Diferencia</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </table>
          </div>
        </div>     
      )

  }

}

export default ValeProducto