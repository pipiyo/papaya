import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateLineaIndex extends React.Component {

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
          updateLinea={this.props.updateLinea} 
          />
        </div>
      )

  }

}

export default UpdateLineaIndex