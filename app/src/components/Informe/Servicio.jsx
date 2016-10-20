import React from 'react'
import Content from './Content'

class Servicio extends React.Component {

  constructor() {
    super()

  }

  render() {
    // solo para prueba
    let o = "1";
    let u = "2"
      return (
        <div class="module-actividad">

            <div class="item-actividad">
                <div class="item-rocha">
                    <h3 data-key="uno" onClick={this.props.click} ><a> S&S 716-CM-B </a> - Ilustre Municipalidad de Chillán </h3>
                    <Content test={ o } />
                </div>                            
            </div>

            <div class="item-actividad">
                <div class="item-rocha">
                    <h3 data-key="dos" onClick={this.props.click} ><a> S&S 716-CM-B </a> - Ilustre Municipalidad de Chillán </h3>
                    <Content test={ u } />
                </div>                            
            </div>
            
        </div>
      )

  }

}

export default Servicio