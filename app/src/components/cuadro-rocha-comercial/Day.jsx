import React, { Component } from 'react'

import _ from 'lodash'

class Day extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>

          <div class="info title-proyecto">

                   {this.props.obj.mes}  

         </div>

          <div class="info title-proyecto">

                  {this.props.obj.dias}

          </div>
        </div>
      )

  }

}

export default Day