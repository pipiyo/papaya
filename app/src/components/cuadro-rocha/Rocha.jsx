import React, { Component } from 'react'
import Servicio from './Servicio'

class RochaItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class="info rocha">
            <div class="datos name" onClick={this.props.showRocha}><p data-indexproyecto={this.props.keyProyecto} data-indexrocha={this.props.index} >{this.props.obj.cp}</p></div>
            <div class="datos date"><p>{this.props.obj.ingreso}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>
            {/*<div class="day"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
            <div class="day ok proyecto"><p></p></div>
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
            <div class="day"><p></p></div>*/}
          </div>

            { this.props.obj.show ? <Servicio
                                      keyProyecto={this.props.keyProyecto} 
                                      keyRocha={this.props.index} 
                                      showServicio={this.props.showServicio}
                                      showSubServicio={this.props.showSubServicio} 
                                      obj={this.props.obj.cs}
                                      /> : null }        

        </div>
      )
  }
}













class Rocha extends Component {

  constructor() {
    super()
  }
  render() {

      return (         
        <div>
            {
              this.props.obj.map( (v, k) => {
                return( <RochaItem 
                                   key={k} 
                                   index={k} 
                                   keyProyecto={this.props.keyProyecto} 
                                   showRocha={this.props.showRocha}  
                                   showServicio={this.props.showServicio}  
                                   showSubServicio={this.props.showSubServicio}  
                                   obj={v} /> )
              })
            }
        </div>
      )
  }
}

export default Rocha