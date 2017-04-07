import React from 'react'
import { Link } from 'react-router'
import DetalleInformeActions from '../../actions/DetalleInformeActions'

class SubActividad extends React.Component {
  constructor() {
    super()
  }

  componentDidMount(){
    DetalleInformeActions.renderAreaServicio(this.props.datos)
    DetalleInformeActions.okEstado(this.props.datos)
  }
/*
  componentDidUpdate(nextProps){
    DetalleInformeActions.okEstado(nextProps.datos)
  }
*/

  componentWillReceiveProps(nextProps){
    DetalleInformeActions.okEstado(nextProps.datos)
  }

  render() {
      return (
          <div data-area={this.props.datos.CODIGO_SUBSERVICIO} class="item-actividades sub">
            <div class="title-actividad">
              <h4>{this.props.datos.CODIGO_PROYECTO} -  {this.props.datos.CODIGO_SUBSERVICIO}</h4> 
              <p><Link to={`/home/actualizar-subactividad/${this.props.datos.CODIGO_SUBSERVICIO}`}><i class="fa fa-pencil" aria-hidden="true"></i></Link></p>
            </div>
            <div data-estado={this.props.datos.CODIGO_SUBSERVICIO} class="description-actividad sub">
              {this.props.renderSubServicio}
            </div>
          </div>
      )

  }

}
export default SubActividad