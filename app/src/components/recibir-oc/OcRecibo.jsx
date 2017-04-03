import React from 'react'
import OcReciboItem from './OcReciboItem'

class OcProducto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-oc-recibo" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-oc-recibo" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-oc-recibo">
            <table class="oc">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>total</th>
                    <th>Recibido</th>
                    <th>Fecha Recibo</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.obj.recibo.map( (recibo,i) => {
                    return <OcReciboItem 
                    key={i}
                    number={i}
                    recibo={recibo} />
                  })
                }
                </tbody>
              </table>
          </div>
        </div>             
      )

  }

}

export default OcProducto