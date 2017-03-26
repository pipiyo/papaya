import React, { Component } from 'react'
import BodegaActions from '../../actions/BodegaActions'

class Producto extends Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module_bodega">
          {this.props.obj.renderItem}
          <button id="view-more" class="view-more" onClick={this.props.renderViewMore}> Ver Más </button>
        </div>
      )
  }

}

export default Producto