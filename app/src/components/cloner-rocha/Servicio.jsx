import React from 'react'
import ServicioItem from './ServicioItem'
import ClonerRochaActions from '../../actions/ClonerRochaActions'

class Servicio extends React.Component {

  constructor() {
    super()
  }
  componentDidMount(){
    ClonerRochaActions.completInput()
  }
  render() {
      return (
        <div>
          <div class="module-arrow top">
            <div class="arrow-a"><a href="#" data-left="-100" data-tabla="tabla-listado-oc" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i></a></div>
            <div class="arrow-b"><h3>Utilice las flechas si es necesario para recorrer la tabla</h3></div>
            <div class="arrow-a"><a href="#" data-left="100" data-tabla="tabla-listado-oc" onClick={this.props.scrollWin}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></a></div>
          </div>
          <div class="module-table-new" id="tabla-listado-oc">
            <table class="oc">
              <thead>
                <tr>
                  <th>Copiar</th>
                  <th>Descripción</th>
                  <th>Fecha Ingreso</th>
                  <th>Fecha Entrega</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.obj.servicio.map( (servicio,i) => {
                    return <ServicioItem obj={this.props.obj} key={i} num={i} servicio={servicio} />
                  })
                } 
              </tbody>
            </table>
          </div>
          <div class="content-view-more">
            <button class="hidden view-more" id="btn-view" onClick={this.props.renderViewMore}>Ver más</button>
          </div>
        </div>
      )

  }

}

export default Servicio