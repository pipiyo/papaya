import React from 'react'
import Content from './Content'
import ContentRocha from './ContentRocha'

class Servicio extends React.Component {

  constructor() {
    super()
  }

  viewRocha(){
    let rocha = []
    let cliente = []
    let contenidoRocha = []
    let valor, i, e, contentRocha

    for (valor in this.props.datos){
        if(rocha.indexOf(this.props.datos[valor].CODIGO_PROYECTO) <= -1){
          rocha.push(this.props.datos[valor].CODIGO_PROYECTO);
          cliente.push(this.props.datos[valor].NOMBRE_CLIENTE);
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
                 <h3 data-key={rocha[i]} onClick={this.props.click} ><a> {rocha[i]} </a> - {cliente[i]} </h3>
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

  render() {
      return (
        <div class="module-actividad">
            { this.viewRocha() }
            <button onClick={this.props.viewMore}>Ver más</button>
        </div>
      )

  }

}

export default Servicio