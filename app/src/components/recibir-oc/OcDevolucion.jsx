import React from 'react'
import OcDevolucionItem from './OcDevolucionItem'

class OcDevolucion extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-oc-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-oc-recibir" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-oc-recibir">
            <table class="oc">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Cantidad</th>
                    <th>Motivo</th>
                    <th>Fecha Devolución</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.obj.devolucion.map( (devolucion,i) => {
                    return <OcDevolucionItem 
                    key={i}
                    number={i}
                    devolucion={devolucion} />
                  })
                }
                </tbody>
              </table>
          </div>
        </div>             
      )

  }

}

export default OcDevolucion