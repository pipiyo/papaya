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
            <Logo logo="css/images/logos/logo.png"/>
            <Item menu={ this.props.menu } click={this.props.click} />
        </header>
      )

  }

}

export default Header