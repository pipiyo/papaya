import React from 'react'
import Filtro from './Filtro'
import Title from './Title'
import Servicio from './Servicio'

class InformeIndex extends React.Component {

  constructor() {
    super()
    this.state = {servicio:[]}
  }
  componentWillReceiveProps(nextProps, nextState){
    this.state.servicio = []
  }

  /* Agrega clase active información de servicio */
  activeClass(ev){
    ev.preventDefault()
    let i;
    let valor = ev.currentTarget.getAttribute("data-key")    
    let estado = ev.currentTarget.classList.toggle('active')

    if(estado){
        this.state.servicio.push(valor);
    }else{
      for(i=0; i < this.state.servicio.length; i++) { 
        (this.state.servicio[i] == valor ) ? this.state.servicio.splice(i,1)  : ""
      } 
    }
    this.setState({servicio:this.state.servicio});
  }

  render() {
      return (         
        <div>
          <Title servicioTitle={this.props.servicio}/>
          <Filtro fechaInicioDate={this.props.fechaInicioDate} fechaEntregaDate={this.props.fechaEntregaDate} fechaInicio={this.props.fechaInicio} fechaEntrega={this.props.fechaEntrega} filtro={this.props.filtro} ejecutivo={this.props.ejecutivo} />
          <Servicio cuenta={this.props.cuenta} servicioTitle={this.props.servicio} datos={this.props.datos} viewMore={this.props.viewMore} servicio={this.state.servicio} click={this.activeClass.bind(this)} />

        </div>
      )

  }

}

export default InformeIndex