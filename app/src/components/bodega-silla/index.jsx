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
          <Title 
            buscado={this.props.obj.buscado}
            volver={this.props.obj.volver}
            />

          {this.props.obj.filtro}

          <Producto 
          obj={this.props.obj} 
          renderViewMore={this.props.renderViewMore}
          />

        </div>
      )

  }

}

export default BodegaSonIndex