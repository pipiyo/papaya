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
              <Link to={`/home/actualizar-reclamo/${this.props.datos.CODIGO_RECLAMO}`}> <i class="fa fa-pencil" aria-hidden="true"></i></Link>                                          
            </td>
            <td>{this.props.datos.CODIGO_RECLAMO}</td>
            <td class="center nr">{this.props.datos.ROCHA}</td>
            <td>{this.props.datos.AREA}</td>
            <td>{this.props.datos.RAZON}</td>
            <td class="nr center">{(this.props.datos.FECHA_INICIO)?this.props.datos.FECHA_INICIO.substring(0,10):this.props.datos.FECHA_INICIO}</td>
            <td class="nr center">{(this.props.datos.FECHA_TERMINO)?this.props.datos.FECHA_TERMINO.substring(0,10):this.props.datos.FECHA_TERMINO}</td>
        </tr>     
      )
  }

}

export default Item