import React from 'react'
import ReactDOM from 'react-dom' 
import { Link } from 'react-router'

class Notification extends React.Component {

  constructor() {
    super()
  }

  getEvent(e) {
    this.props.hideNotification(e)
  }


    componentWillUnmount() {
        window.__myapp_container.removeEventListener('click', this.getEvent.bind(this) )
    }

    componentDidMount() {
        window.__myapp_container.addEventListener('click', this.getEvent.bind(this) )
    }

  render() {
      return (
        <div class="module-notification" ref="notification">
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
          <Link to="/home/notificacion" class="view-all-notification" href="#"> ver todas</Link>
        </div>
      )

  }

}

export default Notification