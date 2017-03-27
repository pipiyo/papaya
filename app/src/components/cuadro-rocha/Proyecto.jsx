import React, { Component } from 'react'
import Rocha from './Rocha'



import _ from 'lodash'


class ProyectoItem extends Component {

  constructor() {
    super()
  }
  render() {

//`${this.props.obj.ingresod} ${this.props.obj.entregad} ${i}`

      return (         
        <div>



        <div class="info proyecto">
            <div class="datos name" onClick={this.props.showProyecto} ><p>{this.props.obj.np}</p></div>
            <div class="datos date"><p>{this.props.obj.ingreso}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>

            {this.props.obj.dia}

            {/*<div class="day"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
            <div class="day ok"><p></p></div>
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

          { this.props.obj.show ? <Rocha
                                        keyProyecto={this.props.index}  
                                        showRocha={this.props.showRocha} 
                                        showServicio={this.props.showServicio}
                                        showSubServicio={this.props.showSubServicio}
                                        obj={this.props.obj.cp} /> : null }
          

        </div>
      )

  }

}






class Proyecto extends Component {

  constructor() {
    super()
  }
  render() {

      return (         
        <div>
            {
              this.props.obj.proyectos.map( (v, k) => {
                return( <ProyectoItem 
                                    key={k} 
                                    index={k} 
                                    showProyecto={this.props.obj.showProyecto}
                                    showRocha={this.props.obj.showRocha}
                                    showServicio={this.props.obj.showServicio}
                                    showSubServicio={this.props.obj.showSubServicio}
                                    obj={v} /> )
              })
            }
        </div>
      )

  }

}

export default Proyecto