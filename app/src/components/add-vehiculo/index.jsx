import React from 'react'
import Title from './Title'
import Form from './Form'

class AddVehiculoIndex extends React.Component {

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
          addVehiculo={this.props.addVehiculo} 
          />
        </div>
      )

  }

}

export default AddVehiculoIndex