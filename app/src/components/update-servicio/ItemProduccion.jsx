import React from 'react'

class ItemProduccion extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
                  ejecutor:this.validador(props.datos[0].EJECUTOR),
                  vale:this.validador(props.datos[0].VALE),
                  cantidad:this.validador(props.datos[0].PUESTOS),
                }
  }
  componentDidMount(){
    let i

    let numero1 = document.getElementById("proceso")
    for(i = 0; numero1.length > i; i++){
      if(numero1.options[i].value.toLowerCase() == this.props.datos[0].PROCESO.toLowerCase()){numero1.options[i].selected = "selected"}
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
                    ejecutor:document.getElementById("ejecutor").value,
                    vale:document.getElementById("vale").value,
                    direccion:document.getElementById("direccion").value,
                    cantidad:document.getElementById("cantidad").value,
                  })
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Producción</h4>
          </div>
          <div className="item-form">
            <label>Ejecutor</label>
            <input value={this.state.ejecutor} onChange={this.onChange.bind(this)} id="ejecutor" type="text"/>
          </div>

          <div className="item-form">
            <label>Vale</label>
            <input value={this.state.vale} onChange={this.onChange.bind(this)} type="text" id="vale" />
          </div>

          <div className="item-form">
            <label>Proceso</label>
            <select id="proceso">
                <option value="">Proceso</option>
                <option value="armado">Armado</option>
                <option value="barniz">Barniz</option>
                <option value="centro de mecanizado">Centro De Mecanizado</option>
                <option value="Corte">Corte</option>
                <option value="Enchape Curvo">Enchape Curvo</option>
                <option value="Enchape Recto">Enchape Recto</option>
                <option value="mueble especiales">Mueble Especiales</option>
                <option value="perforador multiple">Perforador Multiple</option>
                <option value="Ruteado">Ruteado</option>
              </select>
          </div>  

          <div className="item-form">
            <label>Cantidad</label>
            <input value={this.state.cantidad} onChange={this.onChange.bind(this)} type="text" id="cantidad" />
          </div> 

        </div>
      )

  }

}

export default ItemProduccion