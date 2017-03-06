import React from 'react'
import Item from './Item'
import IndicadorServicioActions from '../../actions/IndicadorServicioActions'

class Servicio extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    IndicadorServicioActions.renderAreaServicio(this.props.area)
    IndicadorServicioActions.renderButton(this.props.total[0].total,this.props.datos.length)
  }
  componentDidUpdate(nextProps){
    IndicadorServicioActions.renderAreaServicio(nextProps.area, this.props.area)
    IndicadorServicioActions.renderButton(nextProps.total[0].total,nextProps.datos.length)
  }
  render() {
      return (
        <div>
          <div class="module-table-new">
            <table data-area="ok">
                <thead>
                  <tr>
                    <th>Rocha</th>
                    <th>Cliente</th>
                    <th>Ejecutivo</th>
                    <th>Actividad</th>
                    <th>Descripción</th>
                    <th>Fecha I</th>
                    <th>Fecha E</th>
                    <th>Observación</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.datos}
                </tbody>
              </table>
          </div>
          <div class="content-view-more">
            <button class="hidden view-more" id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>
        </div>   
      )

  }

}

export default Servicio