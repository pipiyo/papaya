import React from 'react'

import Title from './Title'
import Filtro from './Filtro'
import Rocha from './Rocha'


class InformeRochaIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      console.log()
      return (         
        <div>
          <Title />
          <Filtro fechaInicioDate={this.props.fechaInicioDate} fechaEntregaDate={this.props.fechaEntregaDate} fechaInicio={this.props.fechaInicio} fechaEntrega={this.props.fechaEntrega}  filtro={this.props.filtro} />
          <Rocha cuenta={this.props.cuenta} rocha={this.props.rocha} viewMore={this.props.viewMore}  />
        </div>
      )

  }

}

export default InformeRochaIndex