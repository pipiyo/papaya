import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Servicio from './Servicio'

class InformeIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
        <div>
          
          <Title />
          <Filtro />
          <Servicio />

        </div>
      )

  }

}

export default InformeIndex