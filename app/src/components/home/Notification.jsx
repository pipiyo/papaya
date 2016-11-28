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

          {
            this.props.notification.map( (notification, i) => {
              return (

                    <Link key={i} to={`/home/${notification.slug}`} class="item-notification">
                        <div class="img-notification">
                          <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                        </div>
                        <div class="content-notification">
                          <p>Nuevo Servicio</p>
                          <p> Se ingreso Servicio {notification.asset.codigo}</p>
                        </div>
                    </Link>

                )
            })
          }

          <Link to="/home/notificacion" class="view-all-notification" href="#"> ver todas</Link>
        </div>
      )

  }

}

export default Notification