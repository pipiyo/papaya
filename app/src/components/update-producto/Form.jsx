import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateProducto}>
          <fieldset> 
            <Item 
            renderInput={this.props.renderInput}
            obj={this.props.obj} 
            />
          </fieldset> 
        </form> 
      )

  }

}

export default Form