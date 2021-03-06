import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateCliente}>
          <fieldset> 
            <Item obj={this.props.obj} renderInput={this.props.renderInput} />
          </fieldset> 
        </form> 
      )

  }

}

export default Form