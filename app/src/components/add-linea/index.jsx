import React from 'react'
import Title from './Title'
import Form from './Form'

class AddLineaIndex extends React.Component {

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
          addLinea={this.props.addLinea} 
          />
        </div>
      )

  }

}

export default AddLineaIndex