import React from 'react'

class Item extends React.Component {

  constructor() {
    super()
    this.state = {reclamo:""}
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.tipo == "reclamo"){
      this.state.reclamo = <div className="item-form"><label>Reclamo</label><input id="reclamo" type="text" /></div>
    }else{
      this.state.reclamo = ""
    }
  }

  componentWillMount(){
    if(this.props.tipo == "reclamo"){
      this.setState({reclamo:<div className="item-form"><label>Reclamo</label><input id="reclamo" type="text" /></div>})
    }else{
      this.setState({reclamo:""})
    }
  }

  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar Actividad</h4>
            </div>

             {this.state.reclamo} 

            <div className="item-form">
                <label>Rocha</label>
                <input id="rocha" type="text" />
            </div>

            <div className="item-form">
              <label>Servicio</label>
              <select id="area" onChange={this.props.formArea}>
                <option value="">Seleccioné</option>
                <option value="Adquisiciones">Adquisiciones</option>
                <option value="Bodega">Bodega</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Despacho">Despacho</option>
                <option value="Instalacion">Instalacion</option>
                <option value="Prevención de Riesgos">Prevención de Riesgos</option>
                <option value="Produccion">Producción</option>
                <option value="Sillas">Sillas</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>

            <div className="item-form">
              <label>Categoría</label>
              <select id="categoria">
                <option value="">Seleccioné</option>
                <option value="proyecto">Proyecto</option>
                <option value="solicitud">Solicitud</option>
                <option value="solicitud">Proceso</option>
              </select>
            </div>

            <div className="item-form">
                <label>Supervisor</label>
                <input id="supervisor" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <input class="date" id="fechaInicio" type="text"/>
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <input class="date" id="fechaEntrega" type="text"/>
            </div>

            <div className="item-form">
                <label>Días</label>
                <input type="number" class="date" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input id="observacion" type="text"/>
            </div>
          </div>
          {this.props.area}

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