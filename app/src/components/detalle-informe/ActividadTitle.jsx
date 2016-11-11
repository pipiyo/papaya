import React from 'react'

class ActividadTitle extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <h3><a> {this.props.datos.servicio[0].CODIGO_PROYECTO} - {this.props.datos.servicio[0].CODIGO_SERVICIO} </a> - {this.props.datos.servicio[0].DESCRIPCION} 
          </h3>
        </div>
      )
  }

}

export default ActividadTitle