import React from 'react'

import Header from './Header'
import Main from './Main'

class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="frame">
          <Header menu={this.props.obj.menu} submenu={this.props.obj.subMenus} navmovil={this.props.obj.navMovil} />
          <Main user={this.props.obj.user} notification={this.props.obj.notification} navnotification={this.props.obj.navNotification} content={this.props.content}/>
        </div>
      )

  }

}

export default Home