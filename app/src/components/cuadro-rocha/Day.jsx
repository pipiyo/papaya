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
            <div class="datos name none"><p></p></div>
            <div class="datos date"><p></p></div>
            <div class="datos date"><p></p></div>
            <div class="datos percentage"><p></p></div>

          <div class={ `mes mes${this.props.obj.dia}` }>
              <p> <button onClick={this.props.obj.bajarmes} > {`<-`} </button> {this.props.obj.mes} <button onClick={this.props.obj.subirmes} > {`->`} </button> </p>
          </div>





         </div>

          <div class="info title-proyecto">
            <div class="datos name none"><p>Información</p></div>
            <div class="datos date"><p>Fecha I</p></div>
            <div class="datos date"><p>Fecha E</p></div>
            <div class="datos percentage"><p>%</p></div>


            {

                _.times(this.props.obj.dia, (i) => {

                            return( <div key={i} class="day">
                                <p>{++i}</p>
                            </div>  )

                })

            }




          </div>
        </div>
      )

  }

}

export default Day