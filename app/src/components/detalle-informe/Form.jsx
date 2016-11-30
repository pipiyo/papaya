import React from 'react'
import { Link } from 'react-router'

class Form extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="button">
          <Link to={`/home/sub-actividad/${this.props.datos.servicio[0].CODIGO_SERVICIO}`}> Nuevas Sub Actividad </Link>
        </div>
      )

  }

}

export default Form