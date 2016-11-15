import React from 'react'

class ItemInstalacion extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
                  direccion:this.validador(props.datos[0].SUB_DIRECCION),
                  lider:this.validador(props.datos[0].LIDER),
                  instalador1:this.validador(props.datos[0].SUB_INSTALADOR_1),
                  instalador2:this.validador(props.datos[0].SUB_INSTALADOR_2),
                  instalador3:this.validador(props.datos[0].SUB_INSTALADOR_3),
                  puestos:this.validador(props.datos[0].SUB_PUESTOS),
                  os:this.validador(props.datos[0].SUB_OS)
                }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
                  direccion:this.validador(nextProps.datos[0].SUB_DIRECCION),
                  lider:this.validador(nextProps.datos[0].LIDER),
                  instalador1:this.validador(nextProps.datos[0].SUB_INSTALADOR_1),
                  instalador2:this.validador(nextProps.datos[0].SUB_INSTALADOR_2),
                  instalador3:this.validador(nextProps.datos[0].SUB_INSTALADOR_3),
                  puestos:this.validador(nextProps.datos[0].SUB_PUESTOS),
                  os:this.validador(nextProps.datos[0].SUB_OS)
                });
  }
  componentDidMount(){
    let i

    let numero = document.getElementById("comuna")
    for(i = 0; numero.length > i; i++){
      if(numero.options[i].value == this.props.datos[0].SUB_CODIGO_COMUNA){numero.options[i].selected = "selected"}
    }
    let numero1 = document.getElementById("proceso")
    for(i = 0; numero1.length > i; i++){
      if(numero1.options[i].value.toLowerCase() == this.props.datos[0].SUB_PROCESO.toLowerCase()){numero1.options[i].selected = "selected"}
    }
  }

  validador(validador,fecha){
    let text
    if(validador == "" || validador == null || validador == 0 || !validador){
      text = ""
    }
    else{
      text = (fecha)?validador.substring(0,10):validador
    }
    return text
  }

  onChange(e) {
    this.setState({ 
                    direccion:document.getElementById("direccion").value,
                    lider:document.getElementById("lider").value,
                    instalador1:document.getElementById("instalador1").value,
                    instalador2:document.getElementById("instalador2").value,
                    instalador3:document.getElementById("instalador3").value,
                    puestos:document.getElementById("puestos").value,
                    os:document.getElementById("os").value
                  })
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Instalacion</h4>
          </div>
          <div className="item-form">
            <label>Lider</label>
            <input value={this.state.lider} onChange={this.onChange.bind(this)} id="lider" type="text"/>
          </div>

          <div className="item-form">
            <label>Puestos</label>
            <input value={this.state.puestos} onChange={this.onChange.bind(this)} type="number"  id="puestos" />
          </div>  

          <div className="item-form">
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Seleccioné</option>
                <option value="armado">Instalación</option>
                <option value="barniz">Servicio Técnico</option>
                <option value="barniz">Otros</option>
              </select>
          </div> 

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.state.instalador1} onChange={this.onChange.bind(this)} id="instalador1" type="text"/>
          </div> 

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.state.instalador2} onChange={this.onChange.bind(this)} id="instalador2" type="text"/>
          </div>   

          <div className="item-form">
            <label>Instalador</label>
            <input value={this.state.instalador3} onChange={this.onChange.bind(this)} id="instalador3" type="text"/>
          </div>  

          <div className="item-form">
            <label>Dirección</label>
            <input value={this.state.direccion} onChange={this.onChange.bind(this)} type="text"  id="direccion" />
          </div>

          <div className="item-form">
            <label>Comuna</label>
             <select id="comuna">
                <option value="">Seleccioné</option>
                <option value="1">Puente Alto</option>
                <option value="321">La Florida</option>
              </select>
          </div>  

          <div className="item-form">
            <label>OS</label>
            <input value={this.state.os} onChange={this.onChange.bind(this)} type="number"  id="os" />
          </div> 

        </div>
      )

  }

}

export default ItemInstalacion