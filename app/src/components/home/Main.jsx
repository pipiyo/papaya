import React from 'react'
import Nav from './Nav'
import Dialog from '../../routes/DialogRoutes'

class Main extends React.Component {

  constructor() {
    super()
  }

/*
              <ul>
                <li><a href="#">Pagina 1</a></li>
                <li><a href="#">Pagina 2</a></li>
                <li><a href="#">Pagina 3</a></li>
              </ul>
*/

  render() {
      return (
        <div className="main" id="main">
          <Nav 
            showNotification={this.props.showNotification} 
            user={this.props.user} 
            notification={this.props.notification}
            numberNotification={this.props.numberNotification}/>

          <div className="content">
            <div className="breadcrumb">
              <ul>
              </ul>
            </div>
            {React.cloneElement(this.props.content, {scrollWin: this.props.scrollWin})}
          </div>
            <Dialog closeDialog={this.props.closeDialog} mensaje={this.props.mensaje} /> 
        </div>
      )
  }

}

export default Main