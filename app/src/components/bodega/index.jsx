import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Producto from './Producto'

class BodegaIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Filtro />
          <Producto bodega={this.props.bodega} />

        </div>
      )

  }

}

export default BodegaIndex