import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import UpdateReclamoActions from '../../actions/UpdateReclamoActions'

class Item extends React.Component {
    constructor() {
        super()
    }
    componentDidMount(){
        UpdateReclamoActions.selectOption(document.getElementById("area"), this.props.obj.input.area,true)
        UpdateReclamoActions.selectOption(document.getElementById("area1"), this.props.obj.input.area1,true)
        UpdateReclamoActions.selectOption(document.getElementById("razon"), this.props.obj.input.razon,true)
        UpdateReclamoActions.selectOption(document.getElementById("estado"), this.props.obj.input.estado,true)
    }
    componentDidUpdate(nextProps,nextState){
        UpdateReclamoActions.selectOption(document.getElementById("area"), nextProps.obj.input.area,true)
        UpdateReclamoActions.selectOption(document.getElementById("area1"), nextProps.obj.input.area1,true)
        UpdateReclamoActions.selectOption(document.getElementById("razon"), nextProps.obj.input.razon,true)
        UpdateReclamoActions.selectOption(document.getElementById("estado"), nextProps.obj.input.estado,true)
    }
    render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar Reclamo</h4>
            </div>

            <div className="item-form">
                <label>Número</label>
                <input readOnly required id="codigo" type="text" value={this.props.obj.input.codigo} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
                <label>Rocha</label>
                <input required id="rocha" type="text" value={this.props.obj.input.rocha} onChange={this.props.renderInput} />
            </div>

            <div className="item-form">
              <label>Area</label>
              <select id="area">
                <option value="">Seleccioné</option>
                <option value="tecnica">Técnica</option>
                <option value="comercial">Comercial</option>
                <option value="produccion">Producción</option>
                <option value="despacho">Despacho</option>
                <option value="instalacion">Instalación</option>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>

            <div className="item-form">
              <label>Razon</label>
              <select id="razon">
                <option value="">Seleccioné</option>
                <option value="Faltante material">Faltante material</option>
                <option value="Acabado diferente">Acabado diferente</option>
                <option value="Dimension diferente">Dimensión diferente</option>
                <option value="Defecto De Frabica">Defecto de fábrica</option>
                <option value="diseño de producto">diseño de producto</option>
                <option value="Daños otros">Daños otros</option>
              </select>
            </div>

            <div className="item-form">
              <label>Area</label>
              <select id="area1">
                <option value="">Seleccioné</option>
                <option value="tecnica">Técnica</option>
                <option value="comercial">Comercial</option>
                <option value="produccion">Producción</option>
                <option value="despacho">Despacho</option>
                <option value="instalacion">Instalación</option>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>

            <div className="item-form">
              <label>Estado</label>
              <select id="estado">
                <option value="EN PROCESO">En Proceso</option>
                <option value="OK">Ok</option>
                <option value="NULO">Nulo</option>
              </select>
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaInicio} onChange={this.props.renderFechaInicio} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaEntrega} onChange={this.props.renderFechaEntrega} />
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