import React, { Component } from 'react'
import ServicioInfo from './ServicioInfo'
import { Link } from 'react-router'
class RochaItem extends Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <div class={(!this.props.selected)?`info rocha`:(this.props.selected == this.props.obj.np)? `info rocha active`:`info rocha desactive`}>
            <div class={(this.props.obj.cs.length <= 0)?`datos name none`:(this.props.obj.show)?`datos name active`:`datos name`}
              onClick={this.props.showRocha}
              data-npok={this.props.obj.np} 
              data-indexproyecto={this.props.keyProyecto} 
              data-indexrocha={this.props.index} >
                <p 
                  data-indexproyecto={this.props.keyProyecto} 
                  data-indexrocha={this.props.index} >
                  {this.props.obj.cp}
                </p>
            </div>
            <div class="datos date"><p>{this.props.obj.ingreso}</p></div>
            <div class="datos date"><p>{this.props.obj.entrega}</p></div>
            <div class="datos percentage">
              <div class="view">
                <div class="view-item">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  <div class="view-item-info">
                     <p>Cliente: {this.props.obj.cliente}</p>
                     <p>Ejecutivo: {this.props.obj.ejecutivo}</p>
                  </div>
                </div>
              </div>
              <Link to={`/home/descripcion-rocha/${this.props.obj.cp}`} class="link"href="#"><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></Link>
            </div>
            <div class="datos percentage"><p>{`${this.props.obj.estado}%`}</p></div>
          </div>

            { this.props.obj.show ? <ServicioInfo
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