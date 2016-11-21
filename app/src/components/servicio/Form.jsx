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
            <Item rocha={this.props.rocha} tipo={this.props.tipo} area={this.props.area} formArea={this.props.formArea} />
          </fieldset> 
        </form> 
      )

  }

}

export default Form