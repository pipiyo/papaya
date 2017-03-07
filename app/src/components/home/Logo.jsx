import React from 'react'
import { Link } from 'react-router'

class Logo extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
            <div className="logo">
              <a onClick={this.props.navMenu} href="" className="burger"> <i class="fa fa-bars" aria-hidden="true"></i> </a>
              <h1>
                <img src={this.props.logo} alt="logo-empresa"/>
                Papaya
              </h1>
            </div>
      )

  }

}

export default Logo