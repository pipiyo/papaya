import React from 'react'

class OcProductoFootItem extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table-content right">
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Sub Total</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].TOTAL}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Descuento %</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].DESCUENTO_OC}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Descuento $</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].DESCUENTO_2}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Sub Total</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].SUB_TOTAL}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Iva</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].IVA}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Total</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].TOTAL}</p></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>OBSERVACIONES</p></div>
            <div class="module-table-content-item"><p>{this.props.obj.renderOc[0].OBSERVACION}</p></div>
          </div>
        </div> 
      )

  }

}

export default OcProductoFootItem