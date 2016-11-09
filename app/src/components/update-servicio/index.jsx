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
            <Title mensaje={this.props.mensaje} />
            <Form tipo={this.props.tipo} addServicio={this.props.addServicio} area={this.props.area} formArea={this.props.formArea} />
        </div>   
      )

  }

}

export default ServicioIndex