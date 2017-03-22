import React, { Component } from 'react'
import Title from './Title'
import Oc from './Oc'

class OrdenCompraIndex extends Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <Oc
          obj={this.props.obj} 
          scrollWin={this.props.scrollWin}
          autocompleteOff={this.props.autocompleteOff} 
          autocomplete={this.props.autocomplete}  
          renderFechaInicio={this.props.renderFechaInicio} 
          renderFechaEntrega={this.props.renderFechaEntrega}
          addSubActividad={this.props.addSubActividad}
          addRowOc={this.props.addRowOc}
          addOc={this.props.addOc}
          />
        </div>
      )

  }

}

export default OrdenCompraIndex