import React, { Component } from 'react'
import SubServicioInfo from './SubServicioInfo'
import { Link } from 'react-router'

class ServicioItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class={(!this.props.selected)?`info actividad`:(this.props.selected == this.props.np)? `info actividad active`:`info actividad desactive`}>
            <div 
              class={(this.props.obj.css.length <= 0)?`datos name none`:(this.props.obj.show)?`datos name active`:`datos name`} 
              onClick={this.props.showServicio} 
              data-npok={this.props.np}
              data-indexproyecto={this.props.keyProyecto} 
              data-indexrocha={this.props.keyRocha} 
              data-indexservicio={this.props.index} >
                <p
                    data-indexproyecto={this.props.keyProyecto} 
                    data-indexrocha={this.props.keyRocha} 
                    data-indexservicio={this.props.index}>
                  {this.props.obj.csnombre}
                </p>
            </div>
            <div class="datos date"><p>{this.props.obj.inicio}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage">
              <div class="view">
                <div class="view-item">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  <div class="view-item-info">
                    <p>Descripción: {this.props.obj.csnombre}</p>
                    <p>Ejecutivo: Luchin</p>
                  </div>
                </div>
              </div>
              <Link to={`/home/detalle-actividad/${this.props.obj.cs}`} class="link"href="#"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></Link>
            </div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>
          </div>

            { this.props.obj.show ? <SubServicioInfo
                                      keyProyecto={this.props.keyProyecto} 
                                      keyRocha={this.props.keyRocha}
                                      keyServicio={this.props.index} 
                                      showSubServicio={this.props.showSubServicio} 
                                      obj={this.props.obj.css}
                                      np={this.props.np}
                                      selected={this.props.selected}  
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