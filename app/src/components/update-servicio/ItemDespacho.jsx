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
                <option value="1">Puente Alto</option>
                <option value="2">La Florida</option>
              </select>
          </div>

          <div className="item-form">
            <label>Vehiculo</label>
             <select id="vehiculo">
               <option value="">Seleccioné</option>
                <option values="CBWT-96 (Camion 1)">CBWT-96 (Camion 1)</option>
                <option values="CRBC-30 (Camion 2)">CRBC-30 (Camion 2)</option>
                <option values="FXVD-65 (Camion 3)">FXVD-65 (Camion 3)</option>
                <option values="CFDL-32 (Furgon 1)">CFDL-32 (Furgon 1)</option>
                <option values="FYYC-66 (Furgon 2)">FYYC-66 (Furgon 2)</option>
                <option values="DDVG-61 (Camioneta)">DDVG-61 (Camioneta)</option>
              </select>
          </div>

          <div className="item-form">
            <label>M3</label>
            <input type="text" id="m3" />
          </div>
          <div className="item-form">
              <label>FI</label>
              <input type="number" id="fi" />
          </div>
          <div className="item-form">
            <label>TM</label>
            <input type="text" id="tm" />
          </div>  
          <div className="item-form">
            <label>TO</label>
            <input type="text" id="to" />
          </div>   
          <div className="item-form">
            <label>OS</label>
            <input type="text" id="os" />
          </div> 
        </div>
      )

  }

}

export default ItemDespacho