import React from 'react'
import UpdateServicioActions from '../../actions/UpdateServicioActions'

class ItemInstalacion extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso, true)
  }
  componentDidUpdate(){
    UpdateServicioActions.selectOption(document.getElementById("comuna"), this.props.input.comuna, false)
    UpdateServicioActions.selectOption(document.getElementById("proceso"), this.props.input.proceso, true)
  }
  renderInput(event) {
    UpdateServicioActions.renderInput(event.target.id,event.target.value)
  }
  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Instalacion</h4>
          </div>
          <div className="item-form">
            <label>Lider</label>
            <input value={this.props.input.lider} onChange={this.renderInput.bind(this)} id="lider" type="text"/>
          </div>

          <div className="item-form">
            <label>Puestos</label>
            <input value={this.props.input.puestos} onChange={this.renderInput.bind(this)} type="number"  id="puestos" />
          </div>  

          <div className="item-form">
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Seleccioné</option>
                <option value="Instalacion">Instalación</option>
                <option value="Servicio Tecnico">Servicio Técnico</option>
                <option value="otros">Otros</option>
              </select>
          </div> 

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.props.input.instalador1} onChange={this.renderInput.bind(this)} id="instalador1" type="text"/>
          </div> 

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.props.input.instalador2} onChange={this.renderInput.bind(this)} id="instalador2" type="text"/>
          </div>   

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.props.input.instalador3} onChange={this.renderInput.bind(this)} id="instalador3" type="text"/>
          </div>  

          <div className="item-form">
            <label>Dirección</label>
            <input value={this.props.input.direccion} onChange={this.renderInput.bind(this)} type="text"  id="direccion" />
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
            <label>OS</label>
            <input value={this.props.input.os} onChange={this.renderInput.bind(this)} type="number"  id="os" />
          </div> 

        </div>
      )

  }

}

export default ItemInstalacion