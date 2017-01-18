import React from 'react'
import Title from './Title'
import Form from './Form'

class AddProductoIndex extends React.Component {

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
          addProducto={this.props.addProducto} 
          />
        </div>
      )

  }

}

export default AddProductoIndex