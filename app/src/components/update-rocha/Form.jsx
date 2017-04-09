import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.updateRocha}>
          <fieldset> 
            <Item
            renderTotal={this.props.renderTotal}
            renderFechaInicio={this.props.renderFechaInicio} 
            renderFechaEntrega={this.props.renderFechaEntrega} 
            renderFechaActa={this.props.renderFechaActa} 
            renderFechaConfirmacion={this.props.renderFechaConfirmacion}
            obj={this.props.obj}  
            />
          </fieldset> 
        </form> 
      )

  }

}

export default Form