import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateFechaOc}>
          <fieldset> 
            <Item 
              obj={this.props.obj}
              renderFechaActa={this.props.renderFechaActa} 
              renderFechaConfirmacion={this.props.renderFechaConfirmacion}
            />
          </fieldset> 
        </form> 
      )

  }

}

export default Form