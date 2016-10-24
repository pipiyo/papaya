import React from 'react'

class Nav extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
          <nav className="nav-config">
            <a className="notificacion-user">
              <p class="notificacion-num">
                21
              </p>
            </a>
            <div className="name-user">
              <h2>{this.props.nombre}</h2>
            </div>
            <div className="img-user">
              <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
            </div>
          </nav>
      )

  }

}

export default Nav