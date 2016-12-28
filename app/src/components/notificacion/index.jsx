import React, { Component } from 'react'
import Title from './Title'

class NotificacionIndex extends Component {

  constructor() {
    super()
  }

  render() {
      console.log( this.props.obj )
      return (         
        <div>
          <Title />
          <div class="module-notification-all">
      
            {
              this.props.obj.map( (notification) => {
                return (
                        <div key={notification.asset.codigo} class="item-notification">
                          <div class="img-notification">
                            <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                          </div>
                          <div class="content-notification">
                            <p><Link to={`/home/${notification.slug}`} >Nuevo {notification.asset.tipo} {notification.asset.codigo}</Link></p>
                            <p>Para el rocha  {notification.asset.rocha}</p>
                          </div>
                        </div>
                      )
              })
            }

          </div>
        </div>
      )

  }

}

export default NotificacionIndex