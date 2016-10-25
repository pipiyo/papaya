import React from 'react'
import Content from './Content'

class Servicio extends React.Component {

  constructor() {
    super()

  }

  render() {
    // solo para prueba
    let uno,dos,i;
    let o = "1";
    let u = "2"
    for(i=0; i < this.props.rocha.length; i++) { 
        (this.props.rocha[i] == "dos") ? dos = <Content test={ u } /> : dos; 
        (this.props.rocha[i] == "uno") ? uno = <Content test={ o } /> : uno;       
    } 
      return (
        <div class="module-actividad">

            <div class="item-actividad">
                <div class="item-rocha">
                    <h3 class="atrasado" data-key="uno" onClick={this.props.click} ><a> S&S 716-CM-B </a> - Ilustre Municipalidad de Chillán </h3>
                    { uno }
                </div>                            
            </div>

            <div class="item-actividad">
                <div class="item-rocha">
                    <h3 data-key="dos" onClick={this.props.click} ><a> S&S 2020 </a> - Servicio de Salud Coquimbo </h3>
                    { dos }
                </div>                            
            </div>
            
        </div>
      )

  }

}

export default Servicio