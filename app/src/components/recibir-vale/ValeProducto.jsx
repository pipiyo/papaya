import React from 'react'
import ValeProductoItem from './ValeProductoItem'

class ValeProducto extends React.Component {

  constructor() {
    super()
  }
  render() {

      return (
        <div>
          <div class="module-arrow top">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-vale-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-vale-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-vale-recibir">
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