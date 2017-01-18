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
              <label class="cr-title">Opciones a escoger</label>

              <label class="name-radio">Ingreso</label>
              <input type="radio" name="stock" id="radio-ingreso" />
              <label class="radio" for="radio-ingreso"></label>

              <label class="name-radio">Egreso</label>
              <input type="radio" name="stock" id="radio-egreso" />
              <label class="radio" for="radio-egreso"></label>
            </div>

            <div className="item-form">
                <label>Stock</label>
                <input id="stock" type="text" />
            </div>

            <div className="item-form">
                <label>Rocha</label>
                <input id="rocha" type="text"/>
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