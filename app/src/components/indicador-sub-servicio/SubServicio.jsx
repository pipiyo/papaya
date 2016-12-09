import React from 'react'

class Title extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-table abastecimiento">
          <table>
            <thead>
            <tr>
              <th>Rocha</th>
              <th>Cliente</th>
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
              <tr>
                <td>data 1</td>
                <td>data 2</td>
                <td>data 3</td>
                <td>data 4</td>
                <td>data 5</td>
                <td>data 6</td>
                <td>data 7</td>
                <td>data 8</td>
                <td>data 9</td>
                <td>data 10</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

  }

}

export default Title