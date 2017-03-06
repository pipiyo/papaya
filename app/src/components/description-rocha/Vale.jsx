import React from 'react'
import ValeItem from './ValeItem'

class Vale extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-table-new">
          <table class="vale">
              <thead>
                <tr>
                  <th>Vale</th>
                  <th>Departamento</th>
                  <th>Fecha Ingreso</th>
                  <th>Fecha Entrega</th>
                  <th>Empleado</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.obj.renderVale.map( (vale,i) => {
                  return <ValeItem key={i} vale={vale} />
                })
              } 
              </tbody>
            </table>
        </div>
      )

  }

}

export default Vale