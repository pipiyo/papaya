import React from 'react'
import Title from './Title'
import Form from './Form'

class ReclamoIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div>
            <Title mensaje={this.props.mensaje} />
            <Form addReclamo={this.props.addReclamo} />
        </div>   
      )

  }

}

export default ReclamoIndex