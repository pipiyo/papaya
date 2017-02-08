import React from 'react'
import SubServicio from './SubServicio'

class Servicio extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class="info actividad">
            <div class="datos name"><p>Nombre Servicio</p></div>
            <div class="datos date"><p>2016-01-02</p></div>
            <div class="datos date"><p>2016-01-02</p></div>
            <div class="datos percentage"><p>10%</p></div>
            <div class="day"><p></p></div>
            <div class="day ok abastecimiento"><p></p></div>
            <div class="day ok abastecimiento"><p></p></div>
            <div class="day ok abastecimiento"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>
          </div>

          <SubServicio />
        </div>
      )

  }

}

export default Servicio