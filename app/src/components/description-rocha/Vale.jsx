import React from 'react'
import ValeItem from './ValeItem'

class Vale extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table" data-col="seis" data-area="ok">
          <div class="module-table-container">
              <div class="module-table-item">Vale</div>
              <div class="module-table-item">Departamento</div>
              <div class="module-table-item">Fecha Ingreso</div>
              <div class="module-table-item">Fecha Entrega</div>
              <div class="module-table-item">Empleado</div>
              <div class="module-table-item">Estado</div>
              {
                this.props.obj.renderVale.map( (vale,i) => {
                  return <ValeItem key={i} vale={vale} />
                })
              } 
          </div>  
        </div>
      )

  }

}

export default Vale