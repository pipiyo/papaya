import React from 'react'
import Title from './Title'
import Form from './Form'

class AddRochaIndex extends React.Component {

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
          renderRut={this.props.renderRut}
          renderTotal={this.props.renderTotal}
          addRocha={this.props.addRocha}  
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          />
        </div>
      )

  }

}

export default AddRochaIndex