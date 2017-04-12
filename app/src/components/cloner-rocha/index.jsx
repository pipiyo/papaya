import React from 'react'
import Title from './Title'
import Form from './Form'

class ClonerRochaIndex extends React.Component {

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
          scrollWin={this.props.scrollWin}
          renderTotal={this.props.renderTotal}
          clonerRocha={this.props.clonerRocha}  
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          />
        </div>
      )

  }

}

export default ClonerRochaIndex