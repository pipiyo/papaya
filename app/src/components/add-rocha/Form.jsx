import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.addRocha}>
          <fieldset> 
            <Item
            renderTotal={this.props.renderTotal}
            renderFechaInicio={this.props.renderFechaInicio} 
            renderFechaEntrega={this.props.renderFechaEntrega} 
            obj={this.props.obj}  
            />
          </fieldset> 
        </form> 
      )

  }

}

export default Form