import React from 'react'

class ServicioList extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <ul className="media-list">
          {
            this.props.listado.map((empleado, i) => {
              return <p key={ i } className="text-center">{ empleado.nombre }</p>
            })
          }
        </ul>
      </div>
    )
  }
}

export default ServicioList