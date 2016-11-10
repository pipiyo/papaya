import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form onSubmit={this.props.updateServicio}>
          <fieldset> 
            <Item datos={this.props.datos} tipo={this.props.tipo} area={this.props.area}  />
          </fieldset> 
        </form> 
      )

  }

}

export default Form