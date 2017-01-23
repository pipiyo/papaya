import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Producto from './Producto'

class BodegaSonIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Filtro 
          obj={this.props.obj} 
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