import React from 'react'
import { Link } from 'react-router'

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center nr">
              <Link to={`/home/actualizar-vehiculo/${this.props.datos.ID}`}> <i class="fa fa-pencil" aria-hidden="true"></i></Link>                                          
            </td>
            <td>{this.props.datos.ID}</td>
            <td class="center nr">{this.props.datos.PATENTE}</td>
            <td>{this.props.datos.KM_INICIO}</td>
            <td>{this.props.datos.M3}</td>
        </tr>     
      )
  }

}

export default Item