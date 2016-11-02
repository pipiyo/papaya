import React from 'react'

import Item from './Item'

class Form extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <form onSubmit={this.props.addServicio}>
          <fieldset> 
            <Item area={this.props.area} formArea={this.props.formArea} />
          </fieldset> 
        </form> 
      )

  }

}

export default Form