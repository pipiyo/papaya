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
            <div class="module-table-content-item"><input id="t1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Descuento %</p></div>
            <div class="module-table-content-item"><input id="tt1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Descuento $</p></div>
            <div class="module-table-content-item"><input id="tt1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Sub Total</p></div>
            <div class="module-table-content-item"><input id="ttt1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Tipo Iva</p></div>
            <div class="module-table-content-item"><select></select></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Iva</p></div>
            <div class="module-table-content-item"><input id="tttt1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>Total</p></div>
            <div class="module-table-content-item"><input id="ttttt1" /></div>
          </div>
          <div class="module-table-content-item-rows">
            <div class="module-table-content-item"><p>OBSERVACIONES</p></div>
            <div class="module-table-content-item"><input id="tttttt1" /></div>
          </div>
        </div> 
      )

  }

}

export default OcProductoFootItem