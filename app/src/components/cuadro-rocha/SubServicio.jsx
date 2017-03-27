import React, { Component } from 'react'




class SubServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class="info subactividad">
            <div class="datos name"><p>{this.props.obj.css}</p></div>
            <div class="datos date"><p>{this.props.obj.inicio}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage"><p></p></div>

            {this.props.obj.dia}
            
            {/*<div class="day"><p></p></div>
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
            <div class="day"><p></p></div>
            <div class="day"><p></p></div>*/}
          </div>
        </div>
      )

  }

}








class SubServicio extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
            {
              this.props.obj.map( (v, k) => {
                return( <SubServicioItem 
                                   key={k} 
                                   index={k} 
                                   keyProyecto={this.props.keyProyecto} 
                                   keyRocha={this.props.keyRocha} 
                                   keyServicio={this.props.keyServicio}
                                   showSubServicio={this.props.showSubServicio} 
                                   obj={v} /> )
              })
            }
        </div>
      )
  }
}

export default SubServicio