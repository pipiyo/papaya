import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

import SubServicioActions from '../../actions/SubServicioActions'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Control Stock Actividad</h4>
            </div>
            <div class="item-form opc">
              <label class="cr-title">Ingreso o Egreso</label>

              <select required id="stock">
                <option value="">Seleccioné</option>
                <option value="1">Ingreso</option>
                <option value="0">Egreso</option>
              </select>
            </div>

            <div className="item-form">
                <label>Stock</label>
                <input required id="numero" type="number" />
            </div>

            <div className="item-form">
                <label>Rocha</label>
                <input required id="rocha" type="text"/>
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