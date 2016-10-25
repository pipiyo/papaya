import React from 'react'
import { Link } from 'react-router'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="button">
          <Link to="/home/detalle-actividad/sub-actividad"> Nueva Sub Actividad </Link>
        </div>
      )

  }

}

export default Form