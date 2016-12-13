import React from 'react'

class Title extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="title">
          <h3>Sub Actividad {this.props.area}</h3>
        </div>
      )

  }

}

export default Title