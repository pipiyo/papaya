import React, { Component } from 'react'
import Servicio from './Servicio'

class RochaItem extends Component {

  constructor() {
    super()
  }
  render() { 
      return (        
        <div>
          <div class={(!this.props.selected)?`info rocha`:(this.props.selected == this.props.obj.np)? `info rocha active`:`info rocha desactive`}>
            {this.props.obj.dia}  
          </div>

            { this.props.obj.show ? <Servicio
                                      keyProyecto={this.props.keyProyecto} 
                                      keyRocha={this.props.index} 
                                      showServicio={this.props.showServicio}
                                      showSubServicio={this.props.showSubServicio} 
                                      obj={this.props.obj.cs}
                                      np={this.props.obj.np}
                                      selected={this.props.selected}  
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
                                   selected={this.props.selected}  
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