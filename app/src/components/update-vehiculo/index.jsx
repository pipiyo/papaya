import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateVehiculoIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title 
          obj={this.props.obj}
          />
          <Form
          obj={this.props.obj}
          renderInput={this.props.renderInput}
          updateVehiculo={this.props.updateVehiculo} 
          />
        </div>
      )

  }

}

export default UpdateVehiculoIndex