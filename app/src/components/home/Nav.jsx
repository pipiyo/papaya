import React from 'react'
import Notification from './Notification'
import Env from '../../Config'

class Nav extends React.Component {

  constructor() {
    super()
  }



/*
            <div className="notificacion-user hidden" onClick={this.props.navnotification}>
              <p class="notificacion-num">
                21
              </p>
              { notification }
            </div>
*/

  render() {
      let notification;
      (this.props.notification == null) ? notification = "" : notification = <Notification />
      return (
          <nav className="nav-config">
            <div className="name-user">
              <h2>{this.props.user.full_name}</h2>
            </div>
            <div className="img-user">
              <img src={this.props.user.profile_picture} alt="usuario"/>
            </div>
          </nav>
      )

  }

}

export default Nav