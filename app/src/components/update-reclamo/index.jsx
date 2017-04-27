import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateReclamoIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title 
          obj={this.props.obj}
          />
          <Form
          obj={this.props.obj}
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          renderInput={this.props.renderInput}
          updateReclamo={this.props.updateReclamo} 
          />
        </div>
      )

  }

}

export default UpdateReclamoIndex