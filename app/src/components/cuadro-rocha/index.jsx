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

          <div class="module-arrow">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-cuadro-rocha" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-cuadro-rocha" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
           
          <div class="module-cuadro-rocha">
            <div class="module-cuadro-rocha-phone">

              <div class="content-rocha-info">
                <DayInfo 
                  obj={this.props.obj.calendario} />
                <div class="item">

                  <ProyectoInfo obj={this.props.obj} /> 

                </div>
              </div>

              <div class="content-rocha-day" id="tabla-cuadro-rocha">
                <Day 
                  obj={this.props.obj.calendario} />
                <div class="item">
                  <Proyecto obj={this.props.obj} /> 
                </div>
              </div>

              <input 
                    type="button"
                    onClick={this.props.obj.vermas} ></input>


            </div>
          </div>

        </div>
      )

  }

}


export default CuadroRochaIndex