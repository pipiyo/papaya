import React from 'react'
import ContentRocha from './ContentRocha'
import { Link } from 'react-router'

class Rocha extends React.Component {

  constructor() {
    super()
  }

  idServicio(id){
    return "/home/actividad/"+id+"/nueva/"
  }

  fechaActual(){
    let hoy = new Date()
    let dd = hoy.getDate();
    let mm = hoy.getMonth()+1; //hoy es 0!
    let yyyy = hoy.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 
    return yyyy+'-'+mm+'-'+dd;
  }

  atraso(fecha, fechaConfirmacion){
    let atraso
    (fecha > fechaConfirmacion)? atraso = "atrasado" : atraso = "";
    return atraso
  }

  viewRocha(){
    let contenidoRocha = []
    let valor;
    for (valor in this.props.rocha){
      contenidoRocha.push(
        <div class="item" key={ valor }>
          <div class="title-informe">
            <h3 class={this.atraso(this.fechaActual(),this.props.rocha[valor].FECHA_CONFIRMACION)}>{this.props.rocha[valor].CODIGO_PROYECTO} -  {this.props.rocha[valor].NOMBRE_CLIENTE}</h3>
            <Link to={this.idServicio(this.props.rocha[valor].CODIGO_PROYECTO)} class="icon-informe"> <i class="fa fa-plus" aria-hidden="true"></i> </Link>
          </div>
          <ContentRocha rocha={this.props.rocha[valor]} />
        </div>                          
      )    
    }
    return contenidoRocha
  }

  viewbutton(){
    let button = "";
    if(this.props.cuenta[0].total > this.props.rocha.length){
      button = <button class="view-more" onClick={this.props.viewMore}>Ver más</button>
    }
    return button
  }

  render() {
      return (
        <div class="module-informe">
          {this.viewRocha()}
          <div class="content-view-more">
            {this.viewbutton()}
          </div>
        </div>
      )

  }

}

export default Rocha