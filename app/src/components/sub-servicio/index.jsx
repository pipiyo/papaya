import React from 'react'

import Title from './Title'
import Form from './Form'

class ServicioIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div>
            <Title mensaje={this.props.mensaje.texto} />
            <Form
            fecha={this.props.fecha}  
            tipo={this.props.tipo} 
            addServicio={this.props.addServicio} 
            area={this.props.area} 
            renderArea={this.props.renderArea} />
        </div>   
      )

  }

}

export default ServicioIndex