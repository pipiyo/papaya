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
          <Filtro 
          renderFiltro={this.props.renderFiltro}
          />
          <Producto 
          obj={this.props.obj} 
          renderViewMore={this.props.renderViewMore}
          />

        </div>
      )

  }

}

export default BodegaIndex