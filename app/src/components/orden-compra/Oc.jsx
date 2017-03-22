import React from 'react'
import OcItem from './OcItem'
import OcProducto from './OcProducto'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.addOc}>
          <fieldset> 
            <OcItem 
              obj={this.props.obj}
              autocompleteOff={this.props.autocompleteOff} 
              autocomplete={this.props.autocomplete}
              renderFechaInicio={this.props.renderFechaInicio} 
              renderFechaEntrega={this.props.renderFechaEntrega}
              addSubActividad={this.props.addSubActividad}  
            />
          </fieldset> 

          <div class="button">
            <a href="#" onClick={this.props.addRowOc}>Ingresar Fila +</a>
          </div>

          <OcProducto
            obj={this.props.obj}
            scrollWin={this.props.scrollWin} 
          />
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