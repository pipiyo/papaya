import React, { Component } from 'react'
import SubServicio from './SubServicio'





class ServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class="info actividad">
            <div class="datos name" onClick={this.props.showServicio}><p data-indexproyecto={this.props.keyProyecto} data-indexrocha={this.props.keyRocha} data-indexservicio={this.props.index}>{this.props.obj.csnombre}</p></div>
            <div class="datos date"><p>{this.props.obj.inicio}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>
            {/*<div class="day"><p></p></div>
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
            <div class="day"><p></p></div>*/}
          </div>

            { this.props.obj.show ? <SubServicio
                                      keyProyecto={this.props.keyProyecto} 
                                      keyRocha={this.props.keyRocha}
                                      keyServicio={this.props.index} 
                                      showSubServicio={this.props.showSubServicio} 
                                      obj={this.props.obj.css}
                                      /> : null }        


        </div>
      )

  }

}









class Servicio extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
            {
              this.props.obj.map( (v, k) => {
                return( <ServicioItem 
                                   key={k} 
                                   index={k} 
                                   keyProyecto={this.props.keyProyecto} 
                                   keyRocha={this.props.keyRocha} 
                                   showServicio={this.props.showServicio}  
                                   showSubServicio={this.props.showSubServicio} 
                                   obj={v} /> )
              })
            }
        </div>
      )

  }

}

export default Servicio