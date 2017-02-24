import React, { Component } from 'react'
import Title from './Title'
import Vale from './Vale'

class RecibirValeIndex extends Component {

  constructor() {
    super()
  }
  
  render() {
      return (         
        <div>
          <Title />
          <Vale 
          obj={this.props.obj}
          renderInputOcTotal={this.props.renderInputOcTotal} 
          renderInput={this.props.renderInput} 
          updateVale={this.props.updateVale}
          addOc={this.props.addOc}
          />
        </div>
      )
  }
}

export default RecibirValeIndex