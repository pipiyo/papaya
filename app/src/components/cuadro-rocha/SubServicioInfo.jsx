import React, { Component } from 'react'
import { Link } from 'react-router'


class SubServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class={(!this.props.selected)?`info subactividad`:(this.props.selected == this.props.np)? `info subactividad active`:`info subactividad desactive`}>
            <div class="datos name none" data-npok={this.props.np} onClick={this.props.showSubServicio} ><p>{this.props.obj.css}</p></div>
            <div class="datos date"><p>{this.props.obj.inicio}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage">
              <div class="view">
                <div class="view-item">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  <div class="view-item-info">
                    <p>Descripción: {this.props.obj.descripcion}</p>
                  </div>
                </div>
              </div>
              <Link to={`/home/actualizar-subactividad/${this.props.obj.css}`} class="link"href="#"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></Link>
            </div>
            <div class="datos percentage"><p></p></div>
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