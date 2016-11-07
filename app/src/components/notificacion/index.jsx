import React from 'react'
import Title from './Title'

class NotificacionIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <div class="module-notification-all">
              <div class="item-notification">
                <div class="img-notification">
                  <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                </div>
                <div class="content-notification">
                  <p><a href="#"> Nuevo Rocha</a></p>
                  <p> Se ingreso rocha 2055 -> Cristóbal Maturana</p>
                </div>
              </div>
              <div class="item-notification">
                <div class="img-notification">
                  <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
                </div>
                <div class="content-notification">
                  <p><a href="#"> Nuevo Rocha</a></p>
                  <p> Se ingreso rocha 2055 -> Cristóbal Maturana</p>
                </div>
              </div>
          </div>
        </div>
      )

  }

}

export default NotificacionIndex