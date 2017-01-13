import React from 'react'

import Title from './Title'
import Filtro from './Filtro'
import Rocha from './Rocha'


class InformeRochaIndex extends React.Component {

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
          <Rocha 
          obj={this.props.obj}
          renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default InformeRochaIndex