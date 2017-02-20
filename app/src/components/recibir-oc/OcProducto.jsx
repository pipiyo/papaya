import React from 'react'
import OcProductoItem from './OcProductoItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table oc" data-col="diez" data-area="ok">
          <div class="module-table-container">
              <div class="module-table-item">Código</div>
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Observaciones</div>
              <div class="module-table-item">Stock</div>
              <div class="module-table-item">Cantidad</div>
              <div class="module-table-item">Recibido</div>
              <div class="module-table-item">Entregado</div>
              <div class="module-table-item">Diferencia</div>
              <div class="module-table-item">Guia</div>
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
          </div>
        </div>
      )

  }

}

export default OcProducto