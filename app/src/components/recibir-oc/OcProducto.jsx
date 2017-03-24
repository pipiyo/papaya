import React from 'react'
import OcProductoItem from './OcProductoItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-oc-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-oc-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-oc-recibir">
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