import React from 'react'
import Notification from './Notification'
import Env from '../../Config'

class Nav extends React.Component {

  constructor() {
    super()
  }

  render() {
 
      let notification
      (this.props.notification == null) ? notification = "" : notification = <Notification notification={this.props.obj.notification} />

      return (
          <nav className="nav-config">
            <div className="notificacion-user" onClick={this.props.navnotification}>
              <p class="notificacion-num">
                21
              </p>
              { notification }
            </div>
            <div className="name-user">
              <h2>{this.props.nombre}</h2>
            </div>
            <div className="img-user">
              <img src={`${Env.url}css/images/fondos/cristobal.jpg`} alt="usuario"/>
            </div>
          </nav>
      )

  }

}

export default Nav