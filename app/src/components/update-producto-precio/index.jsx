import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateProductoIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Form
          updateProducto={this.props.updateProducto} 
          renderInput={this.props.renderInput}
          obj={this.props.obj}
          />
        </div>
      )

  }

}

export default UpdateProductoIndex