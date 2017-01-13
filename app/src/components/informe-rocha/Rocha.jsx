import React from 'react'
import ContentRocha from './ContentRocha'
import { Link } from 'react-router'

class Rocha extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="module-informe">

          {this.props.obj.renderRochas}

          <div class="content-view-more">
            <button class="view-more" onClick={this.props.renderViewMore}>Ver más</button>
          </div>
        </div>

      )

  }

}

export default Rocha