import React from 'react'
import Title from './Title'
import Filtro from './Filtro'
import Vale from './Vale'

class ListadoValeIndex extends React.Component {

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
          renderFiltroFi={this.props.renderFiltroFi}
          renderFiltroFe={this.props.renderFiltroFe}
         />
         <Vale 
         scrollWin={this.props.scrollWin}
         obj={this.props.obj}
         renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default ListadoValeIndex