import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends Component {

  constructor(props) {
    super(props)
    this.state = {reclamo:"",fechaInicio:props.fechaInicio,fechaEntrega:props.fechaEntrega}
  }

  componentWillReceiveProps(nextProps){
     this.setState({fechaInicio:nextProps.fechaInicio,fechaEntrega:nextProps.fechaEntrega})
  }

  render() {
  
      return (
        <div class="module-filter">
          <div class="item-filter">
              <label> Fecha Inicio </label>
              <DatePicker autoComplete="off" class="date" id="fechaInicio" dateFormat="YYYY-MM-DD" selected={this.state.fechaInicio} onChange={this.props.fechaInicioDate} />
          </div>
          <div class="item-filter">
              <label> Fecha Entrega </label>
              <DatePicker autoComplete="off" class="date" id="fechaEntrega" dateFormat="YYYY-MM-DD" selected={this.state.fechaEntrega} onChange={this.props.fechaEntregaDate} />
          </div>
          <div class="item-filter">
              <label> Código Rocha</label>
              <input autoComplete="off" onChange={this.props.filtro} id="codigo" type="text"/>
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select onChange={this.props.filtro} id="estado">
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select onChange={this.props.filtro} id="vendedor">
                  <option value="">Seleccione</option>
                  {
                    this.props.ejecutivo.map( (ejecutivo) => {
                      return <option value={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`} key={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}>{`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}</option>
                    })
                  }
              </select>
          </div>
          <div class="item-filter">
              <label>Categoría</label>
              <select onChange={this.props.filtro} id="categoria">
                  <option value="">Seleccione</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Solicitud">Solicitud</option>
                  <option value="Proceso">Proceso</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Cliente</label>
              <input autoComplete="off" onChange={this.props.filtro} id="cliente" type="text"/>
          </div>
        </div>
      )

  }

}

export default Filtro