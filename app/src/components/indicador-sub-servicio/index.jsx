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
          <Title />
          <Filtro />
          <SubServicio datos={this.props.datos} />
        </div>   
      )

  }

}

export default IndicadorSubServicioIndex