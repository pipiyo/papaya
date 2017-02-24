import React from 'react'
import ServicioItem from './ServicioItem'
class Servicio extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div class="module-table" data-col="siete" data-area="ok">
          <div class="module-table-container">
            <div class="module-table-content">
              <div class="module-table-item">Actividad</div>
              <div class="module-table-item">Código</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Fecha I</div>
              <div class="module-table-item">Fecha E</div>
              <div class="module-table-item">Observación</div>
              <div class="module-table-item">Estado</div>
            </div>
              {
                this.props.obj.renderServicio.map( (servicio,i) => {
                  return <ServicioItem key={i} servicio={servicio} />
                })
              }

          </div>  
        </div>
      )

  }

}

export default Servicio