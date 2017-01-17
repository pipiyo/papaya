import React from 'react'
import Item from './Item'

import BodegaActions from '../../actions/BodegaActions'

class Producto extends React.Component {

  constructor() {
    super()
  }
  componentDidUpdate(nextProps){
    BodegaActions.renderButton(nextProps.obj.total[0].total,nextProps.obj.renderItem.length)
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.obj.renderItem.length <= 5){
  //     return true
  //   }else{
  //     return false
  //   }
  // }
  render() {
      return (
        <div class="module_bodega">
          {
            this.props.obj.renderItem   
          }
          <button id="view-more" class="view-more" onClick={this.props.renderViewMore}> Ver Más </button>
        </div>
      )
  }

}

export default Producto