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
          <div class={(!this.props.selected)?`info proyecto`:(this.props.selected == this.props.obj.np)? `info proyecto active`:`info proyecto desactive`}>
            {this.props.obj.dia} 
          </div> 

          { this.props.obj.show ? <Rocha
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
                                    selected={this.props.obj.selected} 
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