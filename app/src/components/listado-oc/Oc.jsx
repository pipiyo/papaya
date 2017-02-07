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
        <div class="module-table oc" data-col="catorce" data-area="ok">
          <div class="module-table-container ">
              <div class="module-table-item">Herramienta</div>
              <div class="module-table-item">OC</div>
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Versión</div>
              <div class="module-table-item">Proveedor</div>
              <div class="module-table-item">Fecha Realización</div>
              <div class="module-table-item">Fecha Entrega</div>
              <div class="module-table-item">Fecha Confirmación</div>
              <div class="module-table-item">User</div>
              <div class="module-table-item">Neto</div>
              <div class="module-table-item">Factura</div>
              <div class="module-table-item">Fecha Envio Por Valija</div>
              <div class="module-table-item">Recibir</div>
              <div class="module-table-item">Estado</div>
              {this.props.obj.renderItem}
          </div>
          <div class="module-table-button">
            <button class="hidden" id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>   
        </div>
      )

  }

}

export default OC