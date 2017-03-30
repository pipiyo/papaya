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
            <div class="datos name none"><p>Meses</p></div>
            <div class="datos date"><p><button onClick={this.props.obj.bajarmes} > {<i class="fa fa-angle-left" aria-hidden="true"></i>} </button></p> </div>
            <div class="datos date"><p><button onClick={this.props.obj.subirmes} > {<i class="fa fa-angle-right" aria-hidden="true"></i>} </button></p></div>
            <div class="datos percentage"><p></p></div>
            <div class="datos percentage"><p></p></div>
         </div>

          <div class="info title-proyecto">
            <div class="datos name none"><p>Información</p></div>
            <div class="datos date"><p>Fecha I</p></div>
            <div class="datos date"><p>Fecha E</p></div>
            <div class="datos percentage"><p>Link</p></div>
            <div class="datos percentage"><p>%</p></div>
          </div>
        </div>
      )

  }

}

export default Day