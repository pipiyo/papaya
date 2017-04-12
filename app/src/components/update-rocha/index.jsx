import React from 'react'
import Title from './Title'
import Form from './Form'

class UpdateRochaIndex extends React.Component {

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
          renderTotal={this.props.renderTotal}
          updateRocha={this.props.updateRocha}  
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          renderFechaActa={this.props.renderFechaActa} 
          renderFechaConfirmacion={this.props.renderFechaConfirmacion}
          />
        </div>
      )

  }

}

export default UpdateRochaIndex