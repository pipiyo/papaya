import React from 'react'

class ItemInstalacion extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Instalacion</h4>
          </div>
          <div className="item-form">
            <label>Lider</label>
            <input id="lider" type="text"/>
          </div>

          <div className="item-form">
            <label>Puestos</label>
            <input type="number"  id="puestos" />
          </div>  

          <div className="item-form">
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Seleccioné</option>
                <option value="armado">Instalación</option>
                <option value="barniz">Servicio Técnico</option>
                <option value="barniz">Otros</option>
              </select>
          </div>

          <div className="item-form">
            <label>Instalador</label>
            <input id="instalador" type="text"/>
          </div> 

          <div className="item-form">
            <label>Instalador</label>
            <input id="instalador1" type="text"/>
          </div>   

          <div className="item-form">
            <label>Instalador</label>
            <input id="instalador3" type="text"/>
          </div>  

          <div className="item-form">
            <label>Dirección</label>
            <input type="text"  id="direccion" />
          </div>

          <div className="item-form">
            <label>Comuna</label>
             <select id="comuna">
                <option value="">Seleccioné</option>
                <option value="puente alto">Puente Alto</option>
                <option value="la florida">La Florida</option>
              </select>
          </div>  

        </div>
      )

  }

}

export default ItemInstalacion