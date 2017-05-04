import React, { Component } from 'react'




class SubServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class={(!this.props.selected)?`info subactividad`:(this.props.selected == this.props.np)? `info subactividad active`:`info subactividad desactive`}>
            {this.props.obj.dia}
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
                                   selected={this.props.selected} 
                                   np={this.props.np}
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