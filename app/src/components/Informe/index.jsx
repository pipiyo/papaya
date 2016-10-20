import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Servicio from './Servicio'

class InformeIndex extends React.Component {

  constructor() {
    super()
   // this.state = {num:[]}
  }

  /* Agrega clase active información de rocha */
  atestClass(ev){
    ev.preventDefault()
    //this.setState({num:[]});
    let valor = ev.currentTarget.getAttribute("data-key")    
  }

  render() {

      return (         
        <div>
          
          <Title />
          <Filtro />
          <Servicio click={this.atestClass.bind(this)} />

        </div>
      )

  }

}

export default InformeIndex