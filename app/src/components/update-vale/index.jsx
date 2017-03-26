import React, { Component } from 'react'
import Title from './Title'
import Vale from './Vale'

class ValeEmisionIndex extends Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <Vale
          obj={this.props.obj} 
          scrollWin={this.props.scrollWin}
          autocompleteOff={this.props.autocompleteOff} 
          autocomplete={this.props.autocomplete}  
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          addRowVale={this.props.addRowVale}
          updateVale={this.props.updateVale}
          />
        </div>
      )

  }

}

export default ValeEmisionIndex