import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateServicio}>
          <fieldset> 
            <Item
            sub={this.props.sub}
            input={this.props.input}  
            datos={this.props.datos} 
            tipo={this.props.tipo} 
            area={this.props.area}  />
          </fieldset> 
        </form> 
      )

  }

}

export default Form