import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Proyecto from './Proyecto'
import Day from './Day'

class CuadroRochaIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Filtro />
           
          <div class="module-cuadro-rocha">
            <Day />
            <div class="item">
               <Proyecto />
            </div>

          </div>

        </div>
      )

  }

}

export default CuadroRochaIndex