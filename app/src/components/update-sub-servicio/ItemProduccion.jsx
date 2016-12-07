import React from 'react'
import UpdateSubServicioActions from '../../actions/UpdateSubServicioActions'

class ItemProduccion extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    UpdateSubServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso, true)
  }
  componentDidUpdate(){
    UpdateSubServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso, true)
  }
  renderInput(event) {
    UpdateSubServicioActions.renderInput(event.target.id,event.target.value)
  }
  render() {
    console.log(this.props.input.ejecutor)
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Producción</h4>
          </div>
          <div className="item-form">
            <label>Ejecutor</label>
            <input value={this.props.input.ejecutor} onChange={this.renderInput.bind(this)} id="ejecutor" type="text"/>
          </div>

          <div className="item-form">
            <label>Vale</label>
            <input value={this.props.input.vale} onChange={this.renderInput.bind(this)} type="text" id="vale" />
          </div>

          <div className="item-form">
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Proceso</option>
                <option value="armado">Armado</option>
                <option value="barniz">Barniz</option>
                <option value="centro de mecanizado">Centro De Mecanizado</option>
                <option value="Corte">Corte</option>
                <option value="Enchape Curvo">Enchape Curvo</option>
                <option value="Enchape Recto">Enchape Recto</option>
                <option value="mueble especiales">Mueble Especiales</option>
                <option value="perforador multiple">Perforador Multiple</option>
                <option value="Ruteado">Ruteado</option>
              </select>
          </div>  

          <div className="item-form">
            <label>Cantidad</label>
            <input value={this.props.input.cantidad} onChange={this.renderInput.bind(this)} type="text" id="cantidad" />
          </div> 

        </div>
      )

  }

}

export default ItemProduccion