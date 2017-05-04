import React from 'react'
import Title from './Title'
import Filtro from './Filtro'
import Proveedor from './Proveedor'


class ListadoClienteIndex extends React.Component {

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
          <Proveedor
          obj={this.props.obj}
          scrollWin={this.props.scrollWin}
          renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default ListadoClienteIndex