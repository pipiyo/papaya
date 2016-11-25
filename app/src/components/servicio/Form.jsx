import React from 'react'
import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form autoComplete="off" onSubmit={this.props.addServicio}>
          <fieldset> 
            <Item
            fecha={this.props.fecha} 
            reclamo={this.props.reclamo} 
            rocha={this.props.rocha} 
            tipo={this.props.tipo} 
            area={this.props.area} 
            renderArea={this.props.renderArea} 
            />
          </fieldset> 
        </form> 
      )

  }

}

export default Form