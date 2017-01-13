import React from 'react'
import Item from './Item'

class Producto extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module_bodega">
          {
            this.props.bodega   
          }
          <button class="view-more" onClick={this.props.renderViewMore}> Ver Más </button>
        </div>
      )

  }

}

export default Producto