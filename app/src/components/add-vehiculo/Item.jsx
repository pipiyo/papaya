import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Nuevo Vehiculo</h4>
            </div>

            <div className="item-form">
                <label>Patente</label>
                <input required id="patente" type="text"  />
            </div>

            <div className="item-form">
                <label>KM</label>
                <input required id="km" type="text" />
            </div>

            <div className="item-form">
                <label>M3</label>
                <input required id="m3" type="text" />
            </div>

          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
          
        </div>  
      )

  }

}

export default Item