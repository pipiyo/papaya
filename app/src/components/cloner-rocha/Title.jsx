import React from 'react'

class Title extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
        <div>
            <div className="title">
            	<h3>Formulario actualizar rocha -> {this.props.obj.mensaje.texto } </h3>
            </div>
        </div>   
      )

  }

}

export default Title