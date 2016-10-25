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
            <label>Fecha Entrega</label>
            <input class="date" id="fechaEntrega" type="text"/>
          </div>

          <div className="item-form">
            <label>Días</label>
            <input type="number" class="date" id="dias" />
          </div>   
        </div>
      )

  }

}

export default ItemInstalacion