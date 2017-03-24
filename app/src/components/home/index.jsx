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
            navMenu={this.props.obj.navMenu}
            navmovil={this.props.obj.navMovil} />
          <Main 
            user={this.props.obj.user} 
            content={this.props.content}
            showNotification={this.props.obj.showNotification}
            notification={this.props.obj.notification}
            scrollWin={this.props.obj.scrollWin}
            numberNotification={this.props.obj.numberNotification}/>
        </div>
      )

  }

}

export default Home