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
                    <th>Sub Actividad</th>
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

export default SubServicio