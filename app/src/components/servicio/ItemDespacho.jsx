import React from 'react'

class ItemDespacho extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Despacho</h4>
          </div>
          <div className="item-form">
            <label>Guía Despacho</label>
            <input id="guia" type="text"/>
          </div>

          <div className="item-form">
            <label>Dirección</label>
            <input type="text" id="direccion" />
          </div>

          <div className="item-form">
            <label>Comuna</label>
             <select id="comuna">
                <option value="">Seleccioné</option>
                <option value="puente alto">Puente Alto</option>
                <option value="la florida">La Florida</option>
              </select>
          </div>

          <div className="item-form">
            <label>M3</label>
            <input type="text" id="m3" />
          </div>
          <div className="item-form">
            <label>TP</label>
            <input type="text" id="tp" />
          </div>    
        </div>
      )

  }

}

export default ItemDespacho