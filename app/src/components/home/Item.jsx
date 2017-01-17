import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'


class ItemArea extends Component {  
  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps, nextState){
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
  }

  render() {
      return (
              <ul>
                 {
                   _.map(this.props.items, (item, i) => {
                     return (
                              <li 
                                data-subclick="ok" 
                                id={`subMenu${i}`} 
                                onClick={this.props.activeMenuOnClick} 
                                key={i}>
                                  <Link 
                                  to={item.ruta}>
                                    {item.nombre}
                                  </Link>
                              </li>                       
                             )    
                   })
                 }
              </ul>
      )
  }
}


class Area extends Component {  
  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps, nextState){
    return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
  }

  render() {
      return (
              <ul class="nav-item">
                 {
                   _.map(this.props.menus, (menu, i) => {
                     return (
                             <li key={i} data-active={i}>
                               <a href="#" data-click={i} onClick={this.props.submenuOnClick} >
                                 <div className={menu.icon}>
                                   <i className={menu.img} aria-hidden="true"></i>    
                                 </div>
                                 <p>{menu.name}</p>
                                </a>
                                <ItemArea items={menu.item} activeMenuOnClick={this.props.activeMenuOnClick} />
                              </li>
                             )    
                   })
                 }
              </ul>
      )
  }
}


class Item extends Component {

  constructor() {
    super()
  }

  render() {

      return (
        <nav className="nav">
          <a onClick={this.props.navmovil} class="btn-burger" href=""> <i class="fa fa-bars" aria-hidden="true"></i> </a>
            <Area submenuOnClick={this.props.submenu} activeMenuOnClick={this.props.activeMenu}  menus={this.props.menu} />
        </nav> 
      )

  }

}

export default Item