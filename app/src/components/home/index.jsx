import React from 'react'

import Header from './Header'
import Main from './Main'

class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div className="frame index">
          <Header 
            menu={this.props.obj.menu} 
            submenu={this.props.obj.subMenus} 
            activeMenu={this.props.obj.activeMenu}
            navmovil={this.props.obj.navMovil} />
          <Main 
            user={this.props.obj.user} 
            content={this.props.content}
            showNotification={this.props.obj.showNotification}
            notification={this.props.obj.notification}
            numberNotification={this.props.obj.numberNotification}/>
        </div>
      )

  }

}

export default Home