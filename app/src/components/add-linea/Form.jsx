import React from 'react'
import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.addLinea}>
          <fieldset> 
            <Item obj={this.props.obj} />
          </fieldset> 
        </form> 
      )

  }

}

export default Form