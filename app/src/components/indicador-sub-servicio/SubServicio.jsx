import React from 'react'

class Title extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-table abastecimiento">
          <div class="module-table-content">
            <table>
              <thead>
              <tr>
                <th>Rocha</th>
                <th>Cliente</th>
                <th>Ejecutivo</th>
                <th>Actividad</th>
                <th>Descripción</th>
                <th>Sub Actividad</th>
                <th>Descripción</th>
                <th>Fecha I</th>
                <th>Fecha E</th>
                <th>Observación</th>
                <th>Estado</th>
              </tr>
              </thead>
              <tbody>
               {
                this.props.datos.map( (datos) => {
                  return( 
                    <tr key={datos.CODIGO_SUBSERVICIO}>
                        <td>{datos.CODIGO_PROYECTO}</td>
                        <td>{datos.NOMBRE_CLIENTE}</td>
                        <td>{datos.EJECUTIVO}</td>
                        <td>{datos.CODIGO_SERVICIO}</td>
                        <td>{datos.SD}</td>
                        <td>{datos.CODIGO_SUBSERVICIO}</td>
                        <td>{datos.SSD}</td>
                        <td>{datos.SUB_FECHA_INICIO.substring(0,10)}</td>
                        <td>{datos.SUB_FECHA_ENTREGA.substring(0,10)}</td>
                        <td>{datos.SUB_OBSERVACIONES}</td>
                        <td>{datos.SUB_ESTADO}</td>
                    </tr>
                  )
                })
                }
                
              </tbody>
            </table>
          </div>
        </div>
      )

  }

}

export default Title