import React from 'react'
import { Link } from 'react-router'
import format from 'format-number'
import Env from '../../Config'
let myFormat = format({integerSeparator:'.',decimal: ','})

class Item extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (       
        <tr>
            <td class="center nr">
              <Link to={`/home/actualizar-cliente/${this.props.datos.CODIGO_CLIENTE}`}> <i class="fa fa-pencil" aria-hidden="true"></i></Link>                                          
            </td>
            <td>{this.props.datos.NOMBRE_CLIENTE}</td>
            <td class="center nr">{this.props.datos.RUT_CLIENTE}</td>
            <td>{this.props.datos.DIRECCION}</td>
            <td>{this.props.datos.COMUNA}</td>
            <td class="nr">{this.props.datos.TELEFONO1}</td>
            <td>{this.props.datos.FORMA_PAGO}</td>
            <td class="nr">{this.props.datos.RAZON_SOCIAL}</td>
            <td>{this.props.datos.CELULAR_CONTACTO1}</td>
        </tr>     
      )
  }

}

export default Item