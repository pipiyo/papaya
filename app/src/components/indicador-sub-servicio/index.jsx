import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import SubServicio from './SubServicio'
class IndicadorSubServicioIndex extends React.Component {

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
          <SubServicio
          total={this.props.total} 
          renderViewMore={this.props.renderViewMore}
          area={this.props.area}
          datos={this.props.datos} 
          />
        </div>   
      )

  }

}

export default IndicadorSubServicioIndex