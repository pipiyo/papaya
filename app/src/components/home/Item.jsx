import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'


class ItemArea extends Component {  
  constructor() {
    super()
  }



  render() {
      return (
              <ul>
                 {
                   _.map(this.props.items, (item, i) => {
                    if(item.type == "title"){
                      return (
                              <li className="title"
                                  data-num={`data-${item.num}`}
                                  onClick={this.props.subSubMenu}
                                key={i}>
                                  <h2>
                                    {item.name}
                                  </h2>
                              </li>                       
                             )     
                      }else{
                        return (
                              <li 
                                className={(item.num != "null")?`si hidden`:`no`}
                                data-numok={`data-${item.num}`}
                                data-subclick="ok" 
                                id={`subMenu${item.name.replace(" ", "")}${i}`} 
                                onClick={this.props.activeMenuOnClick} 
                                key={i}>
                                  <Link 
                                  to={item.path}>
                                    {item.name}
                                  </Link>
                              </li>                       
                             )
                      }    
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



  render() {
      return (
              <ul class="nav-item">
                 {
                   _.map(this.props.menus, (menu, i) => {
                     return (
                             <li key={i} data-active={i}>
                               <a href="#" data-click={i} onClick={this.props.submenuOnClick} >
                                 <div className={menu.icon.color}>
                                   <i className={menu.icon.img} aria-hidden="true"></i>    
                                 </div>
                                 <p>{menu.name}</p>
                                </a>
                                <ItemArea subSubMenu={this.props.subSubMenu} items={menu.items} activeMenuOnClick={this.props.activeMenuOnClick} />
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
            <Area
              subSubMenu={this.props.subSubMenu} 
              submenuOnClick={this.props.submenu} 
              activeMenuOnClick={this.props.activeMenu} 
              menus={this.props.menu} />
        </nav> 
      )

  }

}

export default Item