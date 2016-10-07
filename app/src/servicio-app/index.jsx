import React from 'react'
import ServicioList from '../servicio-list'

class ServicioApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = { servicios: [] }
  }

  componentWillMount() {
    fetch('http://local.papaya-apirest/')
      .then((response) => {
        return response.json()
      })
      .then((servicios) => {
        this.setState({ servicios: servicios })
      })
  }

  render() {
    if (this.state.servicios.length > 0) {
      return (
        <div className="container-fluid">
          <ServicioList listado={this.state.servicios} />
        </div>
      )
    } else {
      return <p className="text-center">Cargando servicios...</p>
    }
  }

}

export default ServicioApp