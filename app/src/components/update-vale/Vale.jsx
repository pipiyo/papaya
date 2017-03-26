import React from 'react'
import ValeItem from './ValeItem'
import ValeProducto from './ValeProducto'
import UpdateValeActions from '../../actions/UpdateValeActions'
class Vale extends React.Component {
  constructor() {
    super()
  }
  componentDidMount(){
    UpdateValeActions.completInput()
  }
  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateVale}>
          <fieldset> 
            <ValeItem 
              obj={this.props.obj}
              autocompleteOff={this.props.autocompleteOff} 
              autocomplete={this.props.autocomplete}
              renderFechaInicio={this.props.renderFechaInicio} 
              renderFechaEntrega={this.props.renderFechaEntrega}  
            />
          </fieldset> 

          <div class="button top">
            <a href="#" onClick={this.props.addRowVale}>Ingresar Fila +</a>
          </div>

          <ValeProducto
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

export default Vale