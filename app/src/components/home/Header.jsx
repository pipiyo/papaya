import React from 'react'
import Logo from './Logo'
import Item from './Item'

class Header extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <header className="header" id="header">
            <Logo logo="css/images/logos/logo.png" />
            <Item navmovil={this.props.navmovil} menu={ this.props.menu } submenu={this.props.submenu} />
        </header>
      )

  }

}

export default Header