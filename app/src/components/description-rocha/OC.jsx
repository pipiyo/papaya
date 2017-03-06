import React from 'react'
import OCItem from './OCItem'

class OC extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-table-new">
          <table class="oc">
            <thead>
              <tr>
                <th>OC</th>
                <th>Proveedor</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Entrega</th>
                <th>Fecha Confirmación</th>
                <th>Reclamo</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.obj.renderOC.map( (oc,i) => {
                return <OCItem key={i} oc={oc} />
              })
            } 
            </tbody>
          </table>
        </div>
      )

  }

}

export default OC