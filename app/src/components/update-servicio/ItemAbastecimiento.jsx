import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'
import UpdateServicioActions from '../../actions/UpdateServicioActions'

class ItemInstalacion extends React.Component {

  constructor() {
    super()
  }
  renderFechaMetales(date){
    UpdateServicioActions.renderFechaMetales(date)
  }
  renderCheck(event){
    event.persist()
    UpdateServicioActions.renderCheck(event)
  }
  renderFechaMuebles(date){
    UpdateServicioActions.renderFechaMuebles(date)
  }
  renderFechaEspeciales(date){
    UpdateServicioActions.renderFechaEspeciales(date)
  }
  renderFechaSillas(date){
    UpdateServicioActions.renderFechaSillas(date)
  }
  renderFechaTela(date){
    UpdateServicioActions.renderFechaTela(date)
  }
  renderFechaVidrio(date){
    UpdateServicioActions.renderFechaVidrio(date)
  }
  renderFechaInsumo(date){
    UpdateServicioActions.renderFechaInsumo(date)
  }
  renderFechaImportado(date){
    UpdateServicioActions.renderFechaImportado(date)
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Abastecimiento</h4>
          </div>

          <div className="item-form opc">
            <input disabled={this.props.fecha.fme} checked={this.props.fecha.fme1} onChange={this.renderCheck.bind(this)} type="checkbox" id="check-metales" name="check-metales" value="matales" />
            <label class="checkbox" for="check-metales"></label>
            <label class="name-check">Metales</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Metales</label>
            <DatePicker disabled={this.props.fecha.fme} readOnly class="date" id="fecha-metales" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaMetales} onChange={this.renderFechaMetales.bind(this)} />
          </div>   
          <div className="item-form opc">          
            <input disabled={this.props.fecha.fmu} checked={this.props.fecha.fmu1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-muebles" name="check-muebles" value="muebles" />
            <label class="checkbox" for="check-muebles"></label>
            <label class="name-check">Muebles</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Muebles</label>
            <DatePicker disabled={this.props.fecha.fmu} readOnly class="date" id="fecha-muebles" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaMuebles} onChange={this.renderFechaMuebles.bind(this)} />
          </div>    

          <div className="item-form opc">
            <input disabled={this.props.fecha.fes} checked={this.props.fecha.fes1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-especiales"  name="check-especiales" value="especiales" />
            <label class="checkbox" for="check-especiales"></label>
            <label class="name-check">Especiales</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Especiales</label>
            <DatePicker disabled={this.props.fecha.fes} readOnly class="date" id="fecha-especiales" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaEspeciales} onChange={this.renderFechaEspeciales.bind(this)} />
          </div>   

          <div className="item-form opc">
            <input disabled={this.props.fecha.fsi} checked={this.props.fecha.fsi1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-sillas" name="check-sillas" value="sillas" />
            <label class="checkbox" for="check-sillas" ></label>
            <label class="name-check">Sillas</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Sillas</label>
            <DatePicker disabled={this.props.fecha.fsi} readOnly class="date" id="fecha-sillas" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaSillas} onChange={this.renderFechaSillas.bind(this)} />
          </div>  

          <div className="item-form opc">
            <input disabled={this.props.fecha.fte} checked={this.props.fecha.fte1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-tela" name="check-tela" value="tela" />
            <label class="checkbox" for="check-tela"></label>
            <label class="name-check">Tela</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Tela</label>
            <DatePicker disabled={this.props.fecha.fte} readOnly class="date" id="fecha-tela" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaTela} onChange={this.renderFechaTela.bind(this)} />
          </div>  

          <div className="item-form opc">
            <input disabled={this.props.fecha.fvi} checked={this.props.fecha.fvi1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-vidrio" name="check-vidrio" value="vidrio" />
            <label class="checkbox" for="check-vidrio"></label>
            <label class="name-check">Vidrio</label>
          </div> 
          <div className="item-form sem-ext">
            <label>Fecha Entrega Vidrio</label>
            <DatePicker disabled={this.props.fecha.fvi}  readOnly class="date" id="fecha-vidrio" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaVidrio} onChange={this.renderFechaVidrio.bind(this)} />
          </div> 
  
          <div className="item-form opc">
            <input disabled={this.props.fecha.fin} checked={this.props.fecha.fin1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-insumo" name="check-insumo" value="insumo"/>
            <label class="checkbox" for="check-insumo"></label>
            <label class="name-check">Insumo</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Insumo</label>
            <DatePicker disabled={this.props.fecha.fin} readOnly class="date" id="fecha-insumo" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaInsumo} onChange={this.renderFechaInsumo.bind(this)} />
          </div>  

          <div className="item-form opc">
            <input disabled={this.props.fecha.fim} checked={this.props.fecha.fim1} onChange={this.renderCheck.bind(this)}  type="checkbox" id="check-importado" name="check-importado" value="importado"/>
            <label class="checkbox" for="check-importado"></label>
            <label  class="name-check">Importado</label>
          </div>
          <div className="item-form sem-ext">
            <label>Fecha Entrega Importado</label>
            <DatePicker disabled={this.props.fecha.fim} readOnly class="date" id="fecha-importado" dateFormat="YYYY-MM-DD" selected={this.props.fecha.fechaImportado} onChange={this.renderFechaImportado.bind(this)} />
          </div> 
     
    

        </div>
      )

  }

}

export default ItemInstalacion