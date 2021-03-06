import React from 'react'
import Item from './Item'

import ListadoReclamoActions from '../../actions/ListadoReclamoActions'

class Reclamo extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    ListadoReclamoActions.renderButton(this.props.obj.cuenta[0].total, this.props.obj.renderItem.length)
  }
  componentDidUpdate(nextProps){
    ListadoReclamoActions.renderButton(nextProps.obj.cuenta[0].total, nextProps.obj.renderItem.length)
  }
  render() {
      return (
        <div>
          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-listado-oc" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-listado-oc" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-listado-oc">
            <table class="reclamo">
              <thead>
                <tr>
                  <th>Herramientas</th>
                  <th>Reclamo</th>
                  <th>Rocha</th>
                  <th>Area</th>
                  <th>Razón</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Termino</th>
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

export default Reclamo