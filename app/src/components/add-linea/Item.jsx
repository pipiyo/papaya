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
                <h4>Nueva línea</h4>
            </div>

            <div className="item-form">
                <label>Nombre</label>
                <input required id="nombre" type="text"  />
            </div>

            <div className="item-form">
                <label>Activo</label>
                <select required id="activo">
                  <option value="">Seleccioné</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </select>
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