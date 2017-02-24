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
        <div class="module-table vale" data-col="nueve" data-area="ok">
          <div class="module-table-container ">
            <div class="module-table-content">
              <div class="module-table-item">Herramientas</div>
              <div class="module-table-item">Vale</div>
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Departamento</div>
              <div class="module-table-item">Empleador</div>
              <div class="module-table-item">Fecha Ingreso</div>
              <div class="module-table-item">Fecha Termino</div>
              <div class="module-table-item">User</div>
              <div class="module-table-item">Estado</div>
            </div>
              {this.props.obj.renderItem}
          </div>
          <div class="module-table-button">
            <button class="hidden" id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>   
        </div>
      )

  }

}

export default Vale