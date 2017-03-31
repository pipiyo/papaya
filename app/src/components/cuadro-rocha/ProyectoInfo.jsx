import React, { Component } from 'react'
import RochaInfo from './RochaInfo'
import { Link } from 'react-router'


import _ from 'lodash'


class ProyectoItem extends Component {

  constructor() {
    super()
  }
  render() {
//`${this.props.obj.ingresod} ${this.props.obj.entregad} ${i}`
      return (         
        <div>
          <div class={(!this.props.selected)?`info proyecto`:(this.props.selected == this.props.obj.np)? `info proyecto active`:`info proyecto desactive`} >
            <div  onClick={(!this.props.selected)?this.props.showProyecto:(this.props.selected == this.props.obj.np)? this.props.showProyecto:null} 
                  class={(this.props.obj.cp.length <= 0)?`datos name none`:(this.props.obj.show)?`datos name active`:`datos name`} data-npok={this.props.obj.np} >
                  <p>{this.props.obj.np}</p>
            </div>
            <div class="datos date"><p>{this.props.obj.ingreso}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage">
              <div class="view center">
                    <div class="view-item">
                      <i class="fa fa-eye" aria-hidden="true"></i>
                      <div class="view-item-info">
                        <p>Descripción: {this.props.obj.np}</p>
                        <p>Ejecutivo: Luchin</p>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>
          </div> 

          { this.props.obj.show ? <RochaInfo
                                        selected={this.props.selected}
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
                                    destacado={this.props.obj.destacado}
                                    showProyecto={this.props.obj.showProyecto}
                                    showRocha={this.props.obj.showRocha}
                                    showServicio={this.props.obj.showServicio}
                                    showSubServicio={this.props.obj.showSubServicio}
                                    selected={this.props.obj.selected}
                                    obj={v} /> )
              })
            }
        </div>
      )

  }

}

export default Proyecto