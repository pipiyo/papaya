import React, { Component } from 'react'

import Filtro from './Filtro'
import Title from './Title'
import Proyecto from './Proyecto'
import Day from './Day'

class CuadroRochaIndex extends Component {

  constructor() {
    super()
  }
  render() {

      return (         
        <div>
          <Title />
          <Filtro 
                obj={this.props.obj.form}
                buscar={this.props.obj.buscar} />
           
          <div class="module-cuadro-rocha">
            <Day 
              obj={this.props.obj.calendario} />
            <div class="item">

            <Proyecto obj={this.props.obj} /> 

            </div>

          </div>

        </div>
      )

  }

}


export default CuadroRochaIndex