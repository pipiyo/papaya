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


          <div class={ `mes mes${this.props.obj.dia}` }>
              <p> {this.props.obj.mes} </p>
          </div>

         </div>

          <div class="info title-proyecto">


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