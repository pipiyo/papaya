import React, { Component } from 'react'
import BodegaSillaActions from '../../actions/BodegaSillaActions'
class Producto extends Component {

  constructor() {
    super()
  }
  componentDidUpdate(nextProps){
    //BodegaSillaActions.renderButton(nextProps.obj.total[0].total,nextProps.obj.renderItem.length)
  }
  render() {
      return (
        <div class="module_bodega">
          {this.props.obj.renderItem}
          {(this.props.obj.bodega=="padre")?<button id="view-more" class="view-more" onClick={this.props.renderViewMore}> Ver Más </button>:""}
        </div>
      )
  }

}

export default Producto