import React, { Component } from 'react'

class Title extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div class="title">
          <h3>Bodega Silla {this.props.buscado ? `Codigo Generico -> ${this.props.buscado}` : `` }</h3>
          <div class="button" >
            <button onClick={this.props.volver} class="hidden" id="botonVolverSilla">volver</button>
          </div>
        </div>
      )

  }

}

export default Title