import React from 'react'
import OcItem from './OcItem'
import OcProducto from './OcProducto'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit="">
          <fieldset> 
            <OcItem />
          </fieldset> 

          <div class="button">
            <a>Ingresar Fila +</a>
            <a>Eliminar Fila +</a>
          </div>

          <OcProducto />
          <div className="module-form button top">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </form> 
      )

  }

}

export default Form