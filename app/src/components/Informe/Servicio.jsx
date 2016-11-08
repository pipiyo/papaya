import React from 'react'
import Content from './Content'
import ContentRocha from './ContentRocha'

class Servicio extends React.Component {

  constructor() {
    super()
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
    return "hola"
  }

  viewRocha(){
    let rocha = []
    let cliente = []
    let fechaConfirmacion = []
    let contenidoRocha = []
    let valor, i, e, contentRocha

    for (valor in this.props.datos){
        if(rocha.indexOf(this.props.datos[valor].CODIGO_PROYECTO) <= -1){
          rocha.push(this.props.datos[valor].CODIGO_PROYECTO);
          cliente.push(this.props.datos[valor].NOMBRE_CLIENTE);
          fechaConfirmacion.push(this.props.datos[valor].FECHA_CONFIRMACION);
        }
    }

    for(i=0; i < rocha.length; i++){
      let contenido = []
      for (valor in this.props.datos){
        if(this.props.datos[valor].CODIGO_PROYECTO == rocha[i]){
          contentRocha = <ContentRocha datos={this.props.datos[valor]}/>
          for(e=0; e < this.props.servicio.length; e++) { 
              (this.props.servicio[e] == this.props.datos[valor].CODIGO_PROYECTO) ? contenido.push (<Content key={valor} datos={this.props.datos[valor]} /> ) : ""; 
          }
        } 
      }

      contenidoRocha.push(
        <div class="item-actividad" key={ i }>
             <div class="item-rocha">
                 <h3 class={this.atraso(this.fechaActual(),fechaConfirmacion[i])} data-key={rocha[i]} onClick={this.props.click} ><a> {rocha[i]} </a> - {cliente[i]} </h3>
                 <div class="item-box">
                     {contentRocha}
                     {contenido}
                 </div>
             </div>                            
        </div>
        )  
    }

    return contenidoRocha
  }
  viewbutton(){
    let button = "";
    if(this.props.cuenta[0].total > this.props.datos.length){
      button = <button class="view-more" onClick={this.props.viewMore}>Ver más</button>
    }
    return button
  }
  render() {
      console.log(this.atraso())
      return (
        <div class="module-actividad">
            { this.viewRocha() }
            <div class="content-view-more">
              {this.viewbutton()}
            </div>
        </div>
      )

  }

}

export default Servicio