import React from 'react'

import Title from './Title'
import Form from './Form'

class ServicioIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div>
            <Title />
            <Form
            sub={this.props.sub}
            input={this.props.input} 
            datos={this.props.datos} 
            tipo={this.props.tipo} 
            updateServicio={this.props.updateServicio} 
            area={this.props.area} />
        </div>   
      )

  }

}

export default ServicioIndex