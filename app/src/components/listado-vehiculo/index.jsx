import React from 'react'
import Title from './Title'
import Filtro from './Filtro'
import Vehiculo from './Vehiculo'


class ListadoVehiculoIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <Filtro
          obj={this.props.obj} 
          renderFiltro={this.props.renderFiltro}
          />
          <Vehiculo
          obj={this.props.obj}
          scrollWin={this.props.scrollWin}
          renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default ListadoVehiculoIndex