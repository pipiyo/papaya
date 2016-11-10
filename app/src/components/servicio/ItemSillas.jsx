import React from 'react'

class ItemSillas extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Sillas</h4>
          </div>
          <div className="item-form">
            <label>Ejecutor</label>
            <input id="ejecutor" type="text"/>
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
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Proceso</option>
                <option value="armado">Armado</option>
                <option value="barniz">Barniz</option>
                <option value="centro de mecanizado">Centro De Mecanizado</option>
                <option value="Corte">Corte</option>
                <option value="Enchape Curvo">Enchape Curvo</option>
                <option value="Enchape Recto">Enchape Recto</option>
                <option value="mueble especiales">Mueble Especiales</option>
                <option value="perforador multiple">Perforador Multiple</option>
                <option value="Ruteado">Ruteado</option>
              </select>
          </div>  

          <div className="item-form">
            <label>Cantidad</label>
            <input type="text" id="cantidad" />
          </div> 

        </div>
      )

  }

}

export default ItemSillas