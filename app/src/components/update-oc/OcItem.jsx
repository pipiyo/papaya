import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import SubActividad  from './SubActividad'
import AutoComplet  from '../../routes/AutoComRoutes'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Ingreso orden de compra</h4>
            </div>
            <div className="item-form">
                <label>Numero OC</label>
                <input readOnly value={this.props.obj.numeroOC} required id="codigo" type="text" />
            </div>
            <div className="item-form">
                <label>Despachar a</label>
                <select data-txteditaroc="despachar" required id="despachar">
                  <option value="">Seleccioné</option>
                  <option value="Fabrica">Fábrica</option>
                  <option value="Los Conquistadores">Los Conquistadores</option>
                  <option value="La Dehesa">La Dehesa</option>
                </select>
            </div>
            <div className="item-form">
                <label>Empresa</label>
                <select data-txteditaroc="empresa"  required id="empresa">
                  <option value="">Seleccioné</option>
                  <option value="MULTIOFICINA">Multioficina</option>
                  <option value="MUEBLES Y DISEÑO">Muebles y diseño</option>
                  <option value="SILLAS Y SILLAS">Sillas y sillas</option>
                  <option value="TRANSPORTE JJ">Transporte jj</option>
                </select>
            </div>
            <div className="item-form">
                <label>Rocha</label>
                <input type="text" data-complete="rocha" data-txteditaroc="rocha" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active" id="rocha" />
                <AutoComplet name="rocha" />
            </div>
            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.item.fecha.fechaInicio} onChange={this.props.renderFechaInicio} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.item.fecha.fechaEntrega} onChange={this.props.renderFechaEntrega} />
            </div>
             <div className="item-form">
                <label>Proveedor</label>
                <input required type="text" data-complete="proveedor" data-txteditaroc="proveedor" onBlur={this.props.autocompleteOff} onChange={this.props.autocomplete} class="active" id="proveedor" />
                <AutoComplet name="proveedor" datos1="rut-proveedor" datos2="forma-pago"  />
                <input readOnly required id="rut-proveedor" data-txteditaroc="codproveedor" type="hidden" />
            </div>

            <div className="item-form">
                <label>Forma de pago</label>
                <input data-txteditaroc="pago" required id="forma-pago" type="text" />
            </div>

            <div className="item-form">
                <label>Reclamo</label>
                <input data-txteditaroc="reclamo" id="reclamo" type="text" />
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>sub Actividades</h4>
            </div>
            
            {this.props.obj.compSub}
            
          </div>

          <div className="module-form button">
            <div className="item-form button">
                <input type="button" onClick={this.props.addSubActividad} value="Ingresar nueva"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item