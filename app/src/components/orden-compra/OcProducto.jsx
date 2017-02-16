import React from 'react'
import OcProductoItem from './OcProductoItem'
import OcProductoFootItem from './OcProductoFootItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table oc" data-col="once" data-area="ok">
          <div class="module-table-container">
              <div class="module-table-item">Código</div>
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Observaciones</div>
              <div class="module-table-item">Stock</div>
              <div class="module-table-item">Cantidad</div>
              <div class="module-table-item">Precio Bodega</div>
              <div class="module-table-item">Precio Unitario</div>
              <div class="module-table-item">Precio Lista</div>
              <div class="module-table-item">Descuento</div>
              <div class="module-table-item">Total</div>
              <OcProductoItem />
              <OcProductoFootItem />
          </div>
        </div>
      )

  }

}

export default OcProducto