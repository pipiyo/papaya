import React, { Component } from 'react'
import Content from './Content'
import ContentRocha from './ContentRocha'

class Servicio extends Component {

  constructor() {
    super()
  }

  viewReclamo(){
    let rocha = []
    let cliente = []
    let fechaConfirmacion = []
    let contenidoRocha = []
    let reclamo = []
    let razon = []
    let valor, i, e, contentRocha, consulta

    for (valor in this.props.datos){
        if(reclamo.indexOf(this.props.datos[valor].CODIGO_RECLAMO) <= -1){
          reclamo.push(this.props.datos[valor].CODIGO_RECLAMO)
          rocha.push(this.props.datos[valor].CODIGO_PROYECTO)
          cliente.push(this.props.datos[valor].NOMBRE_CLIENTE)
          razon.push(this.props.datos[valor].RAZON)
          fechaConfirmacion.push(this.props.datos[valor].FECHA_CONFIRMACION)
        }
    }
    
    
    for(i=0; i < reclamo.length; i++){
      let contenido = []
      for (valor in this.props.datos){
        if(this.props.datos[valor].CODIGO_RECLAMO == reclamo[i] && this.props.datos[valor].RECLAMOS == reclamo[i] ){
          contentRocha = <ContentRocha datos={this.props.datos[valor]}/>
          for(e=0; e < this.props.servicio.length; e++) { 
              (this.props.servicio[e] == this.props.datos[valor].CODIGO_RECLAMO) ? contenido.push (<Content key={valor} datos={this.props.datos[valor]} /> ) : ""
          }
        }
      }

      contenidoRocha.push(
        <div class="item-actividad" key={ i }>
             <div class="item-rocha">
                 <h3 class={this.atraso(this.fechaActual(),fechaConfirmacion[i])} data-key={reclamo[i]} onClick={this.props.click} ><a> {rocha[i]} - ({reclamo[i]}-{razon[i]}) </a> - {cliente[i]} </h3>
                 <div class="item-box orden">
                     {contentRocha}
                     {contenido}
                 </div>
             </div>                            
        </div>
        )  
    }
    return contenidoRocha
  }

  viewRocha(){
    let rocha = []
    let cliente = []
    let fechaConfirmacion = []
    let contenidoRocha = []
    let valor, i, e, contentRocha, consulta

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
                 <div class="item-box orden">
                     {contentRocha}
                     {contenido}
                 </div>
             </div>                            
        </div>
        )  
    }
    return contenidoRocha
  }

  tipoInforme(){
    let informe
    (this.props.servicioTitle == "reclamo")? informe = this.viewReclamo() : informe = this.viewRocha()
    return informe
  }

  fechaActual(){
    let hoy = new Date()
    let dd = hoy.getDate()
    let mm = hoy.getMonth()+1 //hoy es 0!
    let yyyy = hoy.getFullYear()

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 
    return yyyy+'-'+mm+'-'+dd
  }

  atraso(fecha, fechaConfirmacion){
    let atraso
    (fecha > fechaConfirmacion)? atraso = "atrasado" : atraso = ""
    return atraso
  }

  viewbutton(){
    let button = "";
    if(this.props.cuenta[0].total > this.props.datos.length){
      button = <button class="view-more" onClick={this.props.viewMore}>Ver más</button>
    }
    return button
  }

  render() {
      return (
        <div class="module-actividad">
            { this.tipoInforme() }
            <div class="content-view-more">
              {this.viewbutton()}
            </div>
        </div>
      )

  }

}

export default Servicio