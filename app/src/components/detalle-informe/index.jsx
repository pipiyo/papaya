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
          <Form />

          <div class="module-actividad">
            <div class="item-actividad sub">

              <div class="item-rocha father">
                <ActividadTitle />

                <div class="item-box">
                  <ActividadContent />
                  <SubActividad />

                </div>
              </div>

            </div>
          </div>

        </div>
      )

  }

}

export default DetalleInformeIndex