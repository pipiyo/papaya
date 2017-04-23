import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import UpdateRochaActions from '../../actions/UpdateRochaActions'

import AutoComplet  from '../../routes/AutoComRoutes'
import AutocompleteActions from '../../actions/AutocompleteActions'

class Item extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    UpdateRochaActions.selectOption(document.getElementById("disenador"), this.props.obj.input.disenador,true)
    UpdateRochaActions.selectOption(document.getElementById("ejecutivo"), this.props.obj.input.ejecutivo,true)
    UpdateRochaActions.selectOption(document.getElementById("linea"), this.props.obj.input.linea,true)
    UpdateRochaActions.selectOption(document.getElementById("departamento"), this.props.obj.input.departamento,true)
    UpdateRochaActions.selectOption(document.getElementById("encargado"), this.props.obj.input.encargado,true)
    UpdateRochaActions.selectOption(document.getElementById("iva"), this.props.obj.input.iva,true)
    UpdateRochaActions.selectOption(document.getElementById("estado"), this.props.obj.input.estado,true)
    UpdateRochaActions.completSelectTotal()
  }
  renderInput(event){
    UpdateRochaActions.renderInput(event.target.id,event.target.value)
  }
  autocomplete(ev){
    ev.persist()
    AutocompleteActions.autocomplete(ev)
  }
  autocompleteOff(ev,input){
    ev.persist()
    AutocompleteActions.autocompleteOff(ev)
  }
  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Datos Rocha</h4>
            </div>

            <div className="item-form">
                <label>Código</label>
                <input readOnly value={this.props.obj.input.codigo} onChange={this.renderInput.bind(this)} required id="codigo" type="text" />
            </div>

            <div className="item-form">
                <label>Cliente</label>
                <input required type="text" value={this.props.obj.input.cliente} data-complete="cliente" onBlur={this.autocompleteOff.bind(this)} onChange={(event) => {this.renderInput(event);this.autocomplete(event)}} class="active" id="cliente" />
                <AutoComplet name="cliente" datos1="rut" datos2="telefono" datos3="contacto" datos4="direccion-obra" />
            </div>

            <div className="item-form">
              <label>Rut </label>
              <input value={this.props.obj.input.rut} onChange={this.renderInput.bind(this)} readOnly required id="rut" type="text" />
            </div>

            <div className="item-form">
              <label>Obra</label>
              <input value={this.props.obj.input.obra} onChange={this.renderInput.bind(this)} required id="obra" type="text" />
            </div>

            <div className="item-form">
              <label>Dirección Obra</label>
              <input value={this.props.obj.input.direccionObra} onChange={this.renderInput.bind(this)} required id="direccion-obra" type="text" />
            </div>

            <div className="item-form">
              <label>Puestos</label>
              <input value={this.props.obj.input.puestos} onChange={this.renderInput.bind(this)} required id="puestos" type="number" />
            </div>

            <div className="item-form">
                <label>Nombre Proyecto</label>
                <input value={this.props.obj.input.nombreProyecto} onChange={this.renderInput.bind(this)} id="nombre-proyecto" type="text"/>
            </div>

            <div className="item-form">
                <label>Línea</label>
                <select required id="linea">
                <option value="">Seleccioné</option>
                  {
                    this.props.obj.linea.map( (linea) => {
                      return <option value={`${linea.NOMBRE_LINEA}`} key={`${linea.CODIGO_LINEA}`}>{`${linea.NOMBRE_LINEA}`}</option>
                    })
                  }
                </select>
            </div>

             <div className="item-form">
                <label>Empresa</label>
                <select required id="departamento">
                  <option value="">Seleccioné</option>
                  <option value="lc">Los conquistadores</option>
                  <option value="ld">La Dehesa</option>
                  <option value="cm">Convenio Marco</option>
                  <option value="S&S">Sillas y Sillas</option>
                  <option value="S&S-CM">Sillas y Sillas CM</option>
                  <option value="M&D">Muebles Y Diseños</option>
                  <option value="M&D-CM">Muebles y Diseños CM</option>
                </select>
            </div>

            <div className="item-form">
                <label>Estado</label>
                <select required id="estado">
                  <option value="">Seleccioné</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Ok">OK</option>
                  <option value="Nulo">Nulo</option>
                  <option value="Acta">Acta</option>
                </select>
            </div>
            <div className="item-form">
                <label>OC</label>
                <input value={this.props.obj.input.oc} onChange={this.renderInput.bind(this)} id="oc" type="text"/>
            </div>

            <div className="item-form">
                <label>Condición de pago</label>
                <input value={this.props.obj.input.pago} onChange={this.renderInput.bind(this)} id="pago" type="text"/>
            </div>

          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>Contacto</h4>
            </div>

            <div className="item-form">
                <label>Telefono</label>
                <input value={this.props.obj.input.telefono} onChange={this.renderInput.bind(this)} id="telefono" type="text"/>
            </div>
            <div className="item-form">
                <label>Contacto</label>
                <input value={this.props.obj.input.contacto} onChange={this.renderInput.bind(this)} id="contacto" type="text"/>
            </div>
            <div className="item-form">
                <label>Mail</label>
                <input value={this.props.obj.input.mail} onChange={this.renderInput.bind(this)} id="mail" type="text"/>
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>Administradores</h4>
            </div>

            <div className="item-form">
                <label>Ejecutivo</label>
                <select required id="ejecutivo">
                <option value="">Seleccioné</option>
                  {
                    this.props.obj.vendedor.map( (ejecutivo) => {
                      return <option value={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`} key={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}>{`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}</option>
                    })
                  }
                </select>
            </div>
            <div className="item-form">
                <label>Diseñador</label>
                <select required id="disenador">
                  <option value="">Seleccioné</option>
                  {
                    this.props.obj.disenador.map( (disenador) => {
                      return <option value={`${disenador.NOMBRES} ${disenador.APELLIDO_PATERNO} ${disenador.APELLIDO_MATERNO}`} key={`${disenador.NOMBRES} ${disenador.APELLIDO_PATERNO} ${disenador.APELLIDO_MATERNO}`}>{`${disenador.NOMBRES} ${disenador.APELLIDO_PATERNO} ${disenador.APELLIDO_MATERNO}`}</option>
                    })
                  }
                </select>
            </div>
            <div className="item-form">
                <label>Encargado</label>
                <select required id="encargado">
                  <option value="">Seleccioné</option>
                  <option value="Cesar Gajardo Cardenas">Cesar Gajardo Cardenas</option>
                  <option value="Raul Gonzalez Marquez">Raul Gonzalez Marquez</option>
                  <option value="Constanza Jhonson Jhonson">Constanza Jhonson Jhonson</option>
                </select>
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>Fechas</h4>
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <DatePicker readOnly class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaInicio} onChange={this.props.renderFechaInicio} />
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <DatePicker readOnly class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaEntrega} onChange={this.props.renderFechaEntrega} />
            </div>

            <div className="item-form">
                <label>Fecha Confirmación</label>
                <DatePicker readOnly class="date" id="fechaConfirmacion" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaConfirmacion} onChange={this.props.renderFechaConfirmacion} />
            </div>

            <div className="item-form">
                <label>Fecha Acta</label>
                <DatePicker readOnly class="date" id="fechaActa" dateFormat="YYYY-MM-DD" selected={this.props.obj.input.fechaActa} onChange={this.props.renderFechaActa} />
            </div>
          </div>

          <div className="module-form">
            <div className="item-form title">
                <h4>Valores</h4>
            </div>

            <div className="item-form">
                <label>Sub Total</label>
            </div>
            <div className="item-form sem-ext">
                <input onChange={this.props.renderTotal} id="subtotal" type="text"/>
            </div>

            <div className="item-form">
                <label>Descuento</label>
            </div>
            <div className="item-form sem-ext">
                <input onChange={this.props.renderTotal} id="descuento" type="text"/>
            </div>

            <div className="item-form">
                <label>Neto</label>
            </div>
            <div className="item-form sem-ext">
                <input id="neto" type="text"/>
            </div>

             <div className="item-form">
                <label>Descuento 2</label>
            </div>
            <div className="item-form sem-ext">
                <input  onChange={this.props.renderTotal} id="descuento2" type="text"/>
            </div>

            <div className="item-form">
                <label>Neto 2</label>
            </div>
            <div className="item-form sem-ext">
                <input id="neto2" type="text"/>
            </div>

            <div className="item-form">
                <select onChange={this.props.renderTotal} required id="iva">
                  <option value="">Seleccioné IVA</option>
                  <option value="Iva">IVA</option>
                  <option value="Iva Retenido">IVA Retenido</option>
                  <option value="retencion">retención</option>
                </select>
            </div>
            <div className="item-form sem-ext">
                <input  id="valoriva" type="text"/>
            </div>

            <div className="item-form">
                <label>Total</label>
            </div>
            <div className="item-form sem-ext">
                <input id="total" type="text"/>
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