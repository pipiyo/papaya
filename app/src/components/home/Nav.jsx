import React from 'react'
import User from './User'

class Nav extends React.Component {

  constructor() {
    super()
  }


/*
      let notification;
      (this.props.notification == null) ? notification = "" : notification = <Notification />
*/



  render() {
      return (
          <nav className="nav-config">

            <div className="notificacion-user hidden" onClick={this.props.showNotification}>
              <p class="notificacion-num">
                21
              </p>
              {this.props.notification}
            </div>

            <div className="name-user">
              <h2>{this.props.user.full_name}</h2>
            </div>

            <div className="img-user">
              <User />
              <img src={this.props.user.profile_picture} alt="usuario"/>
            </div>
          </nav>
      )

  }

}

export default Nav