import React from 'react'

class ItemDespacho extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
                  guia:this.validador(props.datos[0].SUB_GUIA_DESPACHO),
                  comuna:this.validador(props.datos[0].SUB_CODIGO_COMUNA),
                  vehiculo:this.validador(props.datos[0].SUB_TRANSPORTE),
                  direccion:this.validador(props.datos[0].SUB_DIRECCION),
                  m3:this.validador(props.datos[0].SUB_M3),
                  fi:this.validador(props.datos[0].SUB_I),
                  tm:this.validador(props.datos[0].SUB_TM),
                  to:this.validador(props.datos[0].SUB_TP),
                  os:this.validador(props.datos[0].SUB_OS)
                }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
                  guia:this.validador(nextProps.datos[0].SUB_GUIA_DESPACHO),
                  comuna:this.validador(nextProps.datos[0].SUB_CODIGO_COMUNA),
                  vehiculo:this.validador(nextProps.datos[0].SUB_TRANSPORTE),
                  direccion:this.validador(nextProps.datos[0].SUB_DIRECCION),
                  m3:this.validador(nextProps.datos[0].SUB_M3),
                  fi:this.validador(nextProps.datos[0].SUB_I),
                  tm:this.validador(nextProps.datos[0].SUB_TM),
                  to:this.validador(nextProps.datos[0].SUB_TP),
                  os:this.validador(nextProps.datos[0].SUB_OS)
                });
  }
  componentDidMount(){
    let i

    let numero = document.getElementById("comuna")
    for(i = 0; numero.length > i; i++){
      if(numero.options[i].value == this.props.datos[0].SUB_CODIGO_COMUNA){numero.options[i].selected = "selected"}
    }
    let numero1 = document.getElementById("vehiculo")
    for(i = 0; numero1.length > i; i++){
      if(numero1.options[i].value.toLowerCase() == this.props.datos[0].SUB_TRANSPORTE.toLowerCase()){numero1.options[i].selected = "selected"}
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
    this.setState({ guia: document.getElementById("guia").value,
                    direccion: document.getElementById("direccion").value,
                    vehiculo: document.getElementById("vehiculo").value,
                    m3:document.getElementById("m3").value,
                    fi:document.getElementById("fi").value,
                    tm:document.getElementById("tm").value,
                    to:document.getElementById("to").value,
                    os:document.getElementById("os").value
                  })
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Despacho</h4>
          </div>
          <div className="item-form">
            <label>Guía Despacho</label>
            <input value={this.state.guia} onChange={this.onChange.bind(this)} id="guia" type="text"/>
          </div>

          <div className="item-form">
            <label>Dirección</label>
            <input value={this.state.direccion} onChange={this.onChange.bind(this)} type="text" id="direccion" />
          </div>

          <div className="item-form">
            <label>Comuna</label>
             <select id="comuna">
                <option value="">Seleccioné</option>
                <option value="1">Puente Alto</option>
                <option value="2">La Florida</option>
                <option value="21">La Reina</option>
              </select>
          </div>

          <div className="item-form">
            <label>Vehiculo</label>
             <select id="vehiculo">
               <option value="">Seleccioné</option>
                <option values="CBWT-96 (Camion 1)">CBWT-96 (Camion 1)</option>
                <option values="CRBC-30 (Camion 2)">CRBC-30 (Camion 2)</option>
                <option values="FXVD-65 (Camion 3)">FXVD-65 (Camion 3)</option>
                <option values="CFDL-32 (Furgon 1)">CFDL-32 (Furgon 1)</option>
                <option values="FYYC-66 (Furgon 2)">FYYC-66 (Furgon 2)</option>
                <option values="DDVG-61 (Camioneta)">DDVG-61 (Camioneta)</option>
                <option value="Externo">Externo</option>
              </select>
          </div>

          <div className="item-form">
            <label>M3</label>
            <input value={this.state.m3} onChange={this.onChange.bind(this)} type="text" id="m3" />
          </div>
          <div className="item-form">
              <label>FI</label>
              <input value={this.state.fi} onChange={this.onChange.bind(this)} type="number" id="fi" />
          </div>
          <div className="item-form">
            <label>TM</label>
            <input value={this.state.tm} onChange={this.onChange.bind(this)} type="text" id="tm" />
          </div>  
          <div className="item-form">
            <label>TO</label>
            <input value={this.state.to} onChange={this.onChange.bind(this)} type="text" id="to" />
          </div>   
          <div className="item-form">
            <label>OS</label>
            <input value={this.state.os} onChange={this.onChange.bind(this)} type="text" id="os" />
          </div> 
        </div>
      )

  }

}

export default ItemDespacho