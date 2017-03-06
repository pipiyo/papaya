import React from 'react'
import Item from './Item'

import ListadoValeActions from '../../actions/ListadoValeActions'

class Vale extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    ListadoValeActions.renderButton(this.props.obj.cuenta[0].total, this.props.obj.renderItem.length)
  }
  componentDidUpdate(nextProps){
    ListadoValeActions.renderButton(nextProps.obj.cuenta[0].total, nextProps.obj.renderItem.length)
  }
  render() {
      return (
        <div>
          <div class="module-table-new">
            <table class="vale">
                <thead>
                  <tr>
                    <th>Herramientas</th>
                    <th>Vale</th>
                    <th>Rocha</th>
                    <th>Departamento</th>
                    <th>Empleador</th>
                    <th>Fecha Ingreso</th>
                    <th>Fecha Termino</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.obj.renderItem}
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

export default Vale