import React from 'react'
import ServicioItem from './ServicioItem'
class Servicio extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-table-new">
            <table class="planificacion">
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Fecha I</th>
                    <th>Fecha E</th>
                    <th>Observación</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.obj.renderServicio.map( (servicio,i) => {
                    return <ServicioItem key={i} servicio={servicio} />
                  })
                }
                </tbody>
              </table>
          </div>
      )

  }

}

export default Servicio