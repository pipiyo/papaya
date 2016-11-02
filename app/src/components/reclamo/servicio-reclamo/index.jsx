import React from 'react'

import Title from './Title'
import Form from './Form'
import ItemProduccion from './ItemProduccion'
import ItemSillas from './ItemSillas'
import ItemInstalacion from './ItemInstalacion'
import ItemDespacho from './ItemDespacho'

class ServicioIndex extends React.Component {

  constructor() {
    super()
    this.state = {area: ""}
  }

  formArea(ev) {
     switch(ev.target.value) {
      case "Produccion":
        this.setState({area:<ItemProduccion />}) 
      break;
      case "Instalacion":
        this.setState({area:<ItemInstalacion />}) 
      break;
      case "Sillas":
        this.setState({area:<ItemSillas />}) 
      break;
      case "Despacho":
        this.setState({area:<ItemDespacho />}) 
      break;
      default:
        this.setState({area:""}) 
    }
  }

  render() {
      return (
        <div>
            <Title mensaje={this.props.mensaje} />
            <Form addServicio={this.props.addServicio} area={this.state.area} formArea={this.formArea.bind(this)} />
        </div>   
      )

  }

}

export default ServicioIndex