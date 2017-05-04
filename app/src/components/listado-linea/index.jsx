import React from 'react'
import Title from './Title'
import Filtro from './Filtro'
import Linea from './Linea'


class ListadoLineaIndex extends React.Component {

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
          <Linea 
          obj={this.props.obj}
          scrollWin={this.props.scrollWin}
          renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default ListadoLineaIndex