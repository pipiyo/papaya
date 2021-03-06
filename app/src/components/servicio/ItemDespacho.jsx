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
            <label>Comuna</label>
             <select id="comuna">
             <option value="">Seleccioné</option>
                {
                  this.props.comunas.map( (comuna) => {
                    return <option value={comuna.codigo} key={comuna.codigo}>{comuna.nombre}</option>
                  })
                } 
              </select>
          </div>

          <div className="item-form">
            <label>Vehiculo</label>
             <select id="vehiculo">
             <option value="">Seleccioné</option>
                {
                  this.props.vehiculos.map( (vehiculo) => {
                    return <option value={vehiculo.patente} key={vehiculo.id}>{vehiculo.patente}</option>
                  })
                }
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