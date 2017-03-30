import React, { Component } from 'react'

import Filtro from './Filtro'
import Title from './Title'
import Proyecto from './Proyecto'
import ProyectoInfo from './ProyectoInfo'
import Day from './Day'
import DayInfo from './DayInfo'

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
            <div class="module-cuadro-rocha-phone">

              <div class="content-rocha-info">
                <DayInfo 
                  obj={this.props.obj.calendario} />
                <div class="item">

                  <ProyectoInfo obj={this.props.obj} /> 

                </div>
              </div>

              <div class="content-rocha-day">
                <Day 
                  obj={this.props.obj.calendario} />
                <div class="item">
                  <Proyecto obj={this.props.obj} /> 
                </div>
              </div>

            </div>
          </div>

        </div>
      )

  }

}


export default CuadroRochaIndex