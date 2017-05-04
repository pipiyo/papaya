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
              <Link to={`/home/actualizar-linea/${this.props.datos.CODIGO_LINEA}`}> <i class="fa fa-pencil" aria-hidden="true"></i></Link>                                          
            </td>
            <td>{this.props.datos.NOMBRE_LINEA}</td>
        </tr>     
      )
  }

}

export default Item