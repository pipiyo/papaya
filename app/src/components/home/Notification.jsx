import React from 'react'

class Notification extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="module-notification">
          <h6>Notificaciones</h6>
          <div class="item-notification">
              <div class="img-notification">
                <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
              </div>
              <div class="content-notification">
                <p>Nuevo Rocha</p>
                <p> Se ingreso rocha 2055</p>
              </div>
          </div>
          <div class="item-notification">
              <div class="img-notification">
                <img src="css/images/fondos/cristobal.jpg" alt="usuario"/>
              </div>
              <div class="content-notification">
                <p>Nuevo Rocha</p>
                <p> Se ingreso rocha 2055</p>
              </div>
          </div>
        </div>
      )

  }

}

export default Notification