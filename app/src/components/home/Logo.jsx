import React from 'react'
import { Link } from 'react-router'

class Logo extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
            <div className="logo">
              <h1>
                <img src={this.props.logo} alt="logo-empresa"/>
                Wolf
              </h1>
            </div>
      )

  }

}

export default Logo