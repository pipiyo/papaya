import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateOcFechaIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Form 
          obj={this.props.obj}
          updateFechaOc={this.props.updateFechaOc}
          renderFechaActa={this.props.renderFechaActa} 
          renderFechaConfirmacion={this.props.renderFechaConfirmacion}
          />
        </div>
      )

  }

}

export default UpdateOcFechaIndex