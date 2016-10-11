import React from 'react'
import { Link } from 'react-router'

class Main extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="main" id="main">
          <nav className="nav-config">
            <div className="name-user">
              <h2>Cristóbal Maturana</h2>
            </div>
            <div className="img-user">
              <img src="bundle/css/images/fondos/cristobal.jpg" alt="usuario"/>
            </div>
          </nav>

          <div className="content">
            <div className="breadcrumb">
              <ul>
                <li><a href="#">Pagina 1</a></li>
                <li><a href="#">Pagina 2</a></li>
                <li><a href="#">Pagina 3</a></li>
              </ul>
            </div>
          </div>
        </div>
      )

  }

}

export default Main