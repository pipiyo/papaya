import React from 'react'

import { Link } from 'react-router'

class User extends React.Component {

  constructor() {
    super()
  }

  getEvent(e) {
    this.props.hideUserNav(e)
  }

  componentWillUnmount() {
      window.__myapp_container.removeEventListener('click', this.getEvent.bind(this) )
  }

  componentDidMount() {
      window.__myapp_container.addEventListener('click', this.getEvent.bind(this) )
  }

  render() {
      return (
        <div className="user-item" ref="userNav">
          <Link to="/home/profile">Perfil</Link>
          <a onClick={this.props.logout} >Salir</a>
        </div>
      )

  }

}

export default User