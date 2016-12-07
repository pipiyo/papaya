import React from 'react'
import UpdateServicioActions from '../../actions/UpdateServicioActions'

class ItemDespacho extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("vehiculo"), this.props.input.vehiculo,false)
  }
  componentDidUpdate(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("vehiculo"), this.props.input.vehiculo,false)
  }
  renderInput(event) {
    UpdateServicioActions.renderInput(event.target.id,event.target.value)
  }
  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Despacho</h4>
          </div>
          <div className="item-form">
            <label>Guía Despacho</label>
            <input value={this.props.input.guia} onChange={this.renderInput.bind(this)} id="guia" type="text"/>
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
            <input value={this.props.input.m3} onChange={this.renderInput.bind(this)} type="text" id="m3" />
          </div>
          <div className="item-form">
              <label>FI</label>
              <input value={this.props.input.fi} onChange={this.renderInput.bind(this)} type="number" id="fi" />
          </div>
          <div className="item-form">
            <label>TM</label>
            <input value={this.props.input.tm} onChange={this.renderInput.bind(this)} type="text" id="tm" />
          </div>  
          <div className="item-form">
            <label>TO</label>
            <input value={this.props.input.to} onChange={this.renderInput.bind(this)} type="text" id="to" />
          </div>   
          <div className="item-form">
            <label>OS</label>
            <input value={this.props.input.os} onChange={this.renderInput.bind(this)} type="text" id="os" />
          </div> 
        </div>
      )

  }

}

export default ItemDespacho