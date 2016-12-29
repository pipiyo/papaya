import React, { Component } from 'react'
import { Link } from 'react-router'

class ItemNotificacion extends Component {

  constructor() {
    super()
  }

  render() {
      return (        
          <div class="module-notification-all">
            {
              this.props.notifications.map( (nt) => {
                return (
                        <div key={nt.asset.codigo} class="item-notification">
                          <div class="img-notification">
                            <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                          </div>
                          <div class="content-notification">
                            <p><Link to={`/home/${nt.slug}`} >Nuevo {nt.asset.tipo} {nt.asset.codigo}</Link></p>
                            <p>Para el rocha {nt.asset.rocha}</p>
                          </div>
                        </div>
                      )
              })
            }
          </div>
      )

  }

}

export default ItemNotificacion