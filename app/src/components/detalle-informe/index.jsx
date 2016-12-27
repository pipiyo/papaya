import React from 'react'
import Title from './Title'
import Form from './Form'
import ActividadTitle from './ActividadTitle'
import ActividadContent from './ActividadContent'
import SubActividad from './SubActividad'
class DetalleInformeIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (         
        <div>
          <Title />
          <Form datos={this.props.datos} />

          <div class="module-actividad">
            <div class="item-actividad sub">

              <div class="item-rocha father">
                <ActividadTitle datos={this.props.datos} />

                <div class="item-box">
                  <ActividadContent renderServicio={this.props.renderServicio} />
                  <div class="content-actividades">
                    {
                    this.props.datos.sub.map( (sub, i) => {
                     return <SubActividad renderSubServicio={this.props.renderSubServicio[i]} 
                                          key={i} 
                                          datos={this.props.datos.sub[i]} />
                    })
                    }
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