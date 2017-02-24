import React, { Component } from 'react'
import Title from './Title'
import Oc from './Oc'

class RecibirOcIndex extends Component {

  constructor() {
    super()
  }
  
  render() {
      return (         
        <div>
          <Title />
          <Oc 
          obj={this.props.obj}
          renderInputOcTotal={this.props.renderInputOcTotal} 
          renderInputOc={this.props.renderInputOc} 
          renderInput={this.props.renderInput} 
          updateOc={this.props.updateOc}
          addOc={this.props.addOc}
          />
        </div>
      )
  }
}

export default RecibirOcIndex