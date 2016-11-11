import React from 'react'
import Title from './Title'
import Form from './Form'
import ActividadTitle from './ActividadTitle'
import ActividadContent from './ActividadContent'
import SubActividad from './SubActividad'
class DetalleInformeIndex extends React.Component {

  constructor() {
    super()
    this.state = {servicio: []}
  }
  componentWillMount(){
    let valor
    for (valor in this.props.datos.sub){
      this.state.servicio.push(<SubActividad key={valor} datos={this.props.datos.sub[valor]} />)
    }
  }
  
  render() {
      return (         
        <div>
          <Title />
          <Form />

          <div class="module-actividad">
            <div class="item-actividad sub">

              <div class="item-rocha father">
                <ActividadTitle datos={this.props.datos} />

                <div class="item-box">
                  <ActividadContent datos={this.props.datos} />
                  <div class="content-actividades">
                    {this.state.servicio}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )

  }

}

export default DetalleInformeIndex