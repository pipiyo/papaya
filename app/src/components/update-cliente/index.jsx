import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateClienteIndex extends React.Component {

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
          updateCliente={this.props.updateCliente} 
          />
        </div>
      )

  }

}

export default UpdateClienteIndex