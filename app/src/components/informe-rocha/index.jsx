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
          <Filtro />
          <Rocha obj={this.props.obj} />
        </div>
      )

  }

}

export default InformeRochaIndex