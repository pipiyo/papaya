import React from 'react'
import Title from './Title'
import Form from './Form'

class StockProductoIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Form 
          stockProducto={this.props.stockProducto} 
          />
        </div>
      )

  }

}

export default StockProductoIndex