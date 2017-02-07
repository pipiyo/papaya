import React from 'react'
import Title from './Title'
import Filtro from './Filtro'
import Oc from './Oc'


class ListadoOCIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          <Title />
          <Filtro
          obj={this.props.obj} 
          renderFiltroFi={this.props.renderFiltroFi}
          renderFiltroFe={this.props.renderFiltroFe}

          />
          <Oc 
          obj={this.props.obj}
          renderViewMore={this.props.renderViewMore} 
          />
        </div>
      )

  }

}

export default ListadoOCIndex