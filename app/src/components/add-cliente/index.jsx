import React from 'react'
import Title from './Title'
import Form from './Form'

class AddClienteIndex extends React.Component {

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
          addCliente={this.props.addCliente} 
          />
        </div>
      )

  }

}

export default AddClienteIndex