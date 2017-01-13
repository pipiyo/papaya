import React from 'react'
import ContentRocha from './ContentRocha'
import { Link } from 'react-router'

import InformeRochaActions from '../../actions/InformeRochaActions'

class Rocha extends React.Component {

  constructor() {
    super()
  }
  componentDidUpdate(nextProps){
    InformeRochaActions.renderButton(nextProps.obj.total[0].total,nextProps.obj.renderRochas.length)
  }
  render() {
      return (
        <div class="module-informe">

          {this.props.obj.renderRochas}

          <div class="content-view-more">
            <button id="view-more" class="view-more" onClick={this.props.renderViewMore}>Ver más</button>
          </div>
        </div>

      )

  }

}

export default Rocha