import React from 'react'
import Item from './Item'
import IndicadorSubServicioActions from '../../actions/IndicadorSubServicioActions'

class SubServicio extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    IndicadorSubServicioActions.renderAreaServicio(this.props.area)
    IndicadorSubServicioActions.renderButton(this.props.total[0].total,this.props.datos.length)
  }
  componentDidUpdate(nextProps){
    IndicadorSubServicioActions.renderAreaServicio(nextProps.area, this.props.area)
    IndicadorSubServicioActions.renderButton(nextProps.total[0].total,nextProps.datos.length)
  }
  render() {
      return (
        <div class="module-table" data-col="once" data-area="ok">
          <div class="module-table-container">
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Cliente</div>
              <div class="module-table-item">Ejecutivo</div>
              <div class="module-table-item">Actividad</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Sub Actividad</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Fecha I</div>
              <div class="module-table-item">Fecha E</div>
              <div class="module-table-item">Observación</div>
              <div class="module-table-item">Estado</div>
              {
                this.props.datos
              }
          </div>
          <div class="module-table-button">
            <button id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>   
        </div>
      )

  }

}

export default SubServicio