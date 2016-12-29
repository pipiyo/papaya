import React, { Component } from 'react'
import Title from './Title'
import ItemNotification from './ItemNotification'

class NotificacionIndex extends Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <ItemNotification notifications={this.props.obj.notifications} />
        </div>
      )

  }

}

export default NotificacionIndex