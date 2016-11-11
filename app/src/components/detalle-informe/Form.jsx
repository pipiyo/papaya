import React from 'react'
import { Link } from 'react-router'

class Form extends React.Component {

  constructor() {
    super()
  }
  rutaIngresoServicio(){
    return "/home/sub-actividad/"+this.props.datos.servicio[0].CODIGO_SERVICIO
  }

  render() {
      return (
        <div class="button">
          <Link to={this.rutaIngresoServicio()}> Nuevas Sub Actividad </Link>
        </div>
      )

  }

}

export default Form