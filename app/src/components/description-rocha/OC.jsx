import React from 'react'
import OCItem from './OCItem'

class OC extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table" data-col="ocho" data-area="ok">
          <div class="module-table-container">
            <div class="module-table-content">
              <div class="module-table-item">OC</div>
              <div class="module-table-item">Proveedor</div>
              <div class="module-table-item">Fecha Ingreso</div>
              <div class="module-table-item">Fecha Entrega</div>
              <div class="module-table-item">Fecha Confirmación</div>
              <div class="module-table-item">Reclamo</div>
              <div class="module-table-item">Estado</div>
              <div class="module-table-item">Total</div>
            </div>
              {
                this.props.obj.renderOC.map( (oc,i) => {
                  return <OCItem key={i} oc={oc} />
                })
              } 
          </div>
        </div>
      )

  }

}

export default OC