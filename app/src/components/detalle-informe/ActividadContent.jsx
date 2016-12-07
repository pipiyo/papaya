import React from 'react'

class ActividadContent extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div class="item-rocha-info">
          {this.props.renderServicio}
        </div>
      )
  }

}

export default ActividadContent