import React from 'react'

class ItemSillas extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
                  direccion:this.validador(props.datos[0].DIRECCION),
                  ejecutor:this.validador(props.datos[0].EJECUTOR),
                  cantidad:this.validador(props.datos[0].PUESTOS),
                }
  }
  componentDidMount(){
    let i
    let numero = document.getElementById("comuna")
    for(i = 0; numero.length > i; i++){
      if(numero.options[i].value == this.props.datos[0].CODIGO_COMUNA){numero.options[i].selected = "selected"}
    }
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
                    direccion:document.getElementById("direccion").value,
                    cantidad:document.getElementById("cantidad").value,
                  })
  }

  render() {
      return (
        <div className="module-form">
          <div className="item-form title">
              <h4>Sillas</h4>
          </div>
          <div className="item-form">
            <label>Ejecutor</label>
            <input value={this.state.ejecutor} onChange={this.onChange.bind(this)} id="ejecutor" type="text"/>
          </div>

          <div className="item-form">
            <label>Dirección</label>
            <input value={this.state.direccion} onChange={this.onChange.bind(this)} type="text" id="direccion" />
          </div>

          <div className="item-form">
            <label>Comuna</label>
             <select id="comuna">
                <option value="">Seleccioné</option>
                 {
                  this.props.comunas.map( (comuna) => {
                    return <option value={comuna.codigo} key={comuna.codigo}>{comuna.nombre}</option>
                  })
                } 
              </select>
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

export default ItemSillas