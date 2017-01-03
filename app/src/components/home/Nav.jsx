import React from 'react'

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
                {this.props.numberNotification}
              </p>
              {this.props.notification}
            </div>

            <div className="name-user">
              <h2>{this.props.user.full_name}</h2>
            </div>

            <div className="img-user" onClick={this.props.user.showUserNav}>
              {this.props.user.user_nav}
              <img src={this.props.user.profile_picture} alt="usuario"/>
            </div>
          </nav>
      )

  }

}

export default Nav