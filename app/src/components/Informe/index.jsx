import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Servicio from './Servicio'

class InformeIndex extends React.Component {

  constructor() {
    super()
    this.state = {rocha:[]}
  }

  /* Agrega clase active información de rocha */
  activeClass(ev){
    ev.preventDefault()
    let i;
    let valor = ev.currentTarget.getAttribute("data-key")    
    let estado = ev.currentTarget.classList.toggle('active')

    if(estado){
        this.state.rocha.push(valor);
    }else{
      for(i=0; i < this.state.rocha.length; i++) { 
        (this.state.rocha[i] == valor ) ? this.state.rocha.splice(i,1)  : ""
      } 
    }
    this.setState({rocha:this.state.rocha});
  }

  render() {
      return (         
        <div>
          
          <Title />
          <Filtro />
          <Servicio rocha={this.state.rocha} click={this.activeClass.bind(this)} />

        </div>
      )

  }

}

export default InformeIndex