import React from 'react'
import UpdateServicioActions from '../../actions/UpdateServicioActions'

class ItemSillas extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso,true)
  }
  componentDidUpdate(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso,true)
  }
  renderInput(event) {
    UpdateServicioActions.renderInput(event.target.id,event.target.value)
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Sillas</h4>
          </div>
          <div className="item-form">
            <label>Ejecutor</label>
            <input value={this.props.input.ejecutor} onChange={this.renderInput.bind(this)} id="ejecutor" type="text"/>
          </div>

          <div className="item-form">
            <label>Dirección</label>
            <input value={this.props.input.direccion} onChange={this.renderInput.bind(this)} type="text" id="direccion" />
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

export default ItemSillas