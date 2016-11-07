import React from 'react'
import { Link } from 'react-router'

class Notification extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="module-notification">
          <h6>Notificaciones</h6>
          <a class="item-notification">
              <div class="img-notification">
                <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
              </div>
              <div class="content-notification">
                <p>Nuevo Rocha</p>
                <p> Se ingreso rocha 2055</p>
              </div>
          </a>
          <a class="item-notification">
              <div class="img-notification">
                <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
              </div>
              <div class="content-notification">
                <p>Nuevo Rocha</p>
                <p> Se ingreso rocha 2055</p>
              </div>
          </a>
          <Link to="home/notificacion" class="view-all-notification" href="#"> ver todas</Link>
        </div>
      )

  }

}

export default Notification