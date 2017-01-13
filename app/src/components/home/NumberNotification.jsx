import React, { Component } from 'react'

class NumberNotification extends Component {

  constructor() {
    super()
  }

  render() {
      return (
              <p class="notificacion-num">
                {this.props.number}
              </p>
      )

  }

}

export default NumberNotification