import React from 'react'
import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form onSubmit={this.props.addReclamo}>
          <fieldset> 
            <Item fecha={this.props.fecha} />
          </fieldset> 
        </form> 
      )

  }

}

export default Form