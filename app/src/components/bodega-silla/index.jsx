import React, { Component } from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Producto from './Producto'

class BodegaSonIndex extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Filtro 
          obj={this.props.obj.buscar} 
          />
          <Producto 
          obj={this.props.obj} 
          renderViewMore={this.props.renderViewMore}
          />

        </div>
      )

  }

}

export default BodegaSonIndex