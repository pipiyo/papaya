import React from 'react'
import { Link } from 'react-router'

import DetalleInformeActions from '../../actions/DetalleInformeActions'

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

                  {
                    this.props.notifications.map( (notification) => {
                      return (
                                <Link key={notification.asset.codigo} to={`/home/${notification.slug}`} class="item-notification">
                                    <div class="img-notification">
                                      <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                                    </div>
                                    <div class="content-notification">
                                      <p>Nuevo Servicio</p>
                                      <p> Codigo {notification.asset.codigo} </p>
                                    </div>
                                </Link>
                            )
                    })

                  }

          <Link to="/home/notificacion" class="view-all-notification" > ver todas</Link>
        </div>
      )

  }

}

export default Notification