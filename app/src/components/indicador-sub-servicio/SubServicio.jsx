import React from 'react'
import IndicadorSubServicioActions from '../../actions/IndicadorSubServicioActions'

class Title extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    IndicadorSubServicioActions.renderAreaServicio(this.props.area)
    IndicadorSubServicioActions.renderButton(this.props.total[0].total,this.props.datos.length)
  }
  componentDidUpdate(nextProps){
    IndicadorSubServicioActions.renderAreaServicio(nextProps.area, this.props.area)
    IndicadorSubServicioActions.renderButton(nextProps.total[0].total,nextProps.datos.length)
  }
  render() {
    console.log(this.props.datos)
      return (
        <div class="module-table" data-col="once" data-area="ok">
          <div class="module-table-container">
              <div class="module-table-item">Rocha</div>
              <div class="module-table-item">Cliente</div>
              <div class="module-table-item">Ejecutivo</div>
              <div class="module-table-item">Actividad</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Sub Actividad</div>
              <div class="module-table-item">Descripción</div>
              <div class="module-table-item">Fecha I</div>
              <div class="module-table-item">Fecha E</div>
              <div class="module-table-item">Observación</div>
              <div class="module-table-item">Estado</div>
    
              {
                this.props.datos.map( (datos,i) => {
                  return( 
                    <div class="module-table-content" key={i}>
                        <div class="module-table-content-item a-center">{datos.CODIGO_PROYECTO}</div>
                        <div class="module-table-content-item">{datos.NOMBRE_CLIENTE}</div>
                        <div class="module-table-content-item">{datos.EJECUTIVO}</div>
                        <div class="module-table-content-item a-right">{datos.CODIGO_SERVICIO}</div>
                        <div class="module-table-content-item">{datos.SD}</div>
                        <div class="module-table-content-item a-right">{datos.CODIGO_SUBSERVICIO}</div>
                        <div class="module-table-content-item">{datos.SSD}</div>
                        <div class="module-table-content-item a-center">{datos.SUB_FECHA_INICIO.substring(0,10)}</div>
                        <div class="module-table-content-item a-center">{datos.SUB_FECHA_ENTREGA.substring(0,10)}</div>
                        <div class="module-table-content-item">{datos.SUB_OBSERVACIONES}</div>
                        <div class="module-table-content-item">{datos.SUB_ESTADO}</div>
                    </div>
                  )
                })
              }
          </div>
          <div class="module-table-button">
            <button id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>   
        </div>
      )

  }

}

export default Title