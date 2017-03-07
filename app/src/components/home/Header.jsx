import React from 'react'
import Logo from './Logo'
import Item from './Item'
import Env from '../../Config'

class Header extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <header className="header" id="header">
            <Logo
            navMenu={this.props.navMenu} 
            logo={`${Env.url}css/images/logos/logo.png`} 
            />
            <Item 
            activeMenu={this.props.activeMenu}
            navmovil={this.props.navmovil} 
            menu={ this.props.menu } 
            submenu={this.props.submenu} />
        </header>
      )

  }

}

export default Header