import React, { Component } from 'react'

class Title extends Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="title">
          <h3>Informe {this.props.servicioTitle}</h3>
        </div>
      )

  }

}

export default Title