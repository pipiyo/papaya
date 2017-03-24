import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Servicio from './Servicio'
class IndicadorServicioIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
          <Title area={this.props.area} />
          <Filtro  
          ejecutivo={this.props.ejecutivo}
          filtro={this.props.filtro} 
          renderFiltro={this.props.renderFiltro} 
          renderFiltroFi={this.props.renderFiltroFi}
          renderFiltroFe={this.props.renderFiltroFe}
          />
          <Servicio
          total={this.props.total}
          scrollWin={this.props.scrollWin} 
          renderViewMore={this.props.renderViewMore}
          area={this.props.area}
          datos={this.props.datos} 
          />
        </div>   
      )

  }

}

export default IndicadorServicioIndex