import React from 'react'
import DatePicker from 'react-datepicker'
import moment  from 'moment'

class Filtro extends React.Component {

  constructor(props) {
    super()
     this.state = {fechaInicio:props.fechaInicio,fechaEntrega:props.fechaEntrega}
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
              <input autoComplete="off" id="codigo" type="text" onChange={this.props.filtro} />
          </div>
          <div class="item-filter">
              <label> Estado</label>
              <select id="estado" onChange={this.props.filtro}>
                  <option value="En Proceso">En Proceso</option>
                  <option value="ACTA">Acta</option>
                  <option value="OK">OK</option>
                  <option value="Nula">Nulo</option>
              </select>
          </div>
          <div class="item-filter">
              <label>Vendedor</label>
              <select id="vendedor" onChange={this.props.filtro}>
                  <option value="">Seleccione</option>
                  {
                    this.props.ejecutivo.map( (ejecutivo) => {
                      return <option value={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`} key={`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}>{`${ejecutivo.NOMBRES} ${ejecutivo.APELLIDO_PATERNO} ${ejecutivo.APELLIDO_MATERNO}`}</option>
                    })
                  }
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