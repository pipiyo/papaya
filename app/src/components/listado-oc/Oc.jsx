import React from 'react'
import Item from './Item'

import ListadoOcActions from '../../actions/ListadoOcActions'

class OC extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    ListadoOcActions.renderButton(this.props.obj.cuenta[0].total, this.props.obj.renderItem.length)
  }
  componentDidUpdate(nextProps){
    ListadoOcActions.renderButton(nextProps.obj.cuenta[0].total, nextProps.obj.renderItem.length)
  }
  render() {
      return (
        <div>
          <div class="module-table-new">
            <table class="oc">
              <thead>
                <tr>
                  <th>Herramientas</th>
                  <th>OC</th>
                  <th>Rocha</th>
                  <th>Versión</th>
                  <th>Proveedor</th>
                  <th>Fecha Realización</th>
                  <th>Fecha Entrega</th>
                  <th>Fecha Confirmación</th>
                  <th>Fecha Recibo</th>
                  <th>User</th>
                  <th>Neto</th>
                  <th>Factura</th>
                  <th>Fecha Envio Por Valija</th>         
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

export default OC