import React from 'react'
import OcProductoItem from './OcProductoItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-table-new">
            <table class="oc">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Rocha</th>
                    <th>Descripción</th>
                    <th>Observaciones</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th>Recibido</th>
                    <th>Entregado</th>
                    <th>Diferencia</th>
                    <th>Guia</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.obj.renderProductos.map( (producto,i) => {
                    return <OcProductoItem 
                    key={i}
                    number={i}
                    renderInputOcTotal={this.props.renderInputOcTotal} 
                    renderInputOc={this.props.renderInputOc}  
                    guia= {this.props.obj.guia[i]} 
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

export default OcProducto