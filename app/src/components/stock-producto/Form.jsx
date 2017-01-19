import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.stockProducto}>
          <fieldset> 
            <Item />
          </fieldset> 
        </form> 
      )

  }

}

export default Form