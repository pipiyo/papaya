import React, { Component } from 'react'
import SubServicio from './SubServicio'





class ServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class={(!this.props.selected)?`info actividad`:(this.props.selected == this.props.np)? `info actividad active`:`info actividad desactive`}>
            {this.props.obj.dia}
          </div>

            { /* this.props.obj.show ? <SubServicio
                                      keyProyecto={this.props.keyProyecto} 
                                      keyRocha={this.props.keyRocha}
                                      keyServicio={this.props.index} 
                                      showSubServicio={this.props.showSubServicio} 
                                      obj={this.props.obj.css}
                                      np={this.props.np}
                                      selected={this.props.selected}  
                                      /> : null */ }        
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
                                   selected={this.props.selected}  
                                   np={this.props.np} 
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