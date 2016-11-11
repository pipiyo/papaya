import React from 'react'

class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state ={
                  codigo:props.datos[0].CODIGO_SERVICIO,
                  categoria:props.datos[0].CATEGORIA,
                  supervisor : props.datos[0].SUPERVISOR,
                  estado : props.datos[0].ESTADO,
                  dias : props.datos[0].DIAS,
                  fechaInicio : this.validador(props.datos[0].FECHA_INICIO,true),
                  fechaEntrega : this.validador(props.datos[0].FECHA_INICIO,true),
                  descripcion : props.datos[0].DESCRIPCION,
                  observaciones : props.datos[0].OBSERVACIONES
                }
  }
  componentDidMount(){
    let i
    let numero = document.getElementById("categoria")
    for(i = 0; numero.length > i; i++){
      if(numero.options[i].value.toLowerCase() == this.props.datos[0].CATEGORIA.toLowerCase()){numero.options[i].selected = "selected"}
    }
  
    let numero1 = document.getElementById("estado")
    for(i = 0; numero1.length > i; i++){
      if(numero1.options[i].value.toLowerCase() == this.props.datos[0].ESTADO.toLowerCase()){numero1.options[i].selected = "selected"}
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
    this.setState({ codigo: document.getElementById("numero").value,
                    supervisor: document.getElementById("supervisor").value,
                    fechaInicio: document.getElementById("fechaInicio").value,
                    fechaEntrega: document.getElementById("fechaEntrega").value,
                    dias: document.getElementById("dias").value,
                    descripcion: document.getElementById("descripcion").value,
                    observaciones: document.getElementById("observacion").value,
                  })
  }

  

  render() {
      return (
        <div>
          <div className="module-form">
            <div className="item-form title">
                <h4>Actualizar Actividad</h4>
            </div>

            <div className="item-form">
                <label>Número</label>
                <input id="numero" type="text" value={this.state.codigo} onChange={this.onChange.bind(this)} />
            </div>

            <div className="item-form">
              <label>Categoría</label>
              <select id="categoria">
                <option value="proyecto">Proyecto</option>
                <option value="solicitud">Solicitud</option>
                <option value="proceso">Proceso</option>
              </select>
            </div>

            <div className="item-form">
              <label>Estado</label>
              <select id="estado">
                <option value="OK">Ok</option>
                <option value="EN PROCESO">En Proceso</option>
                <option value="NULO">Nulo</option>
              </select>
            </div>

            <div className="item-form">
                <label>Supervisor</label>
                <input value={this.state.supervisor} onChange={this.onChange.bind(this)} id="supervisor" type="text" />
            </div>

            <div className="item-form">
                <label>Fecha Inicio</label>
                <input value={this.state.fechaInicio} onChange={this.onChange.bind(this)} class="date" id="fechaInicio" type="text"/>
            </div>

            <div className="item-form">
                <label>Fecha Entrega</label>
                <input value={this.state.fechaEntrega} onChange={this.onChange.bind(this)} class="date" id="fechaEntrega" type="text"/>
            </div>

            <div className="item-form">
                <label>Días</label>
                <input value={this.state.dias} onChange={this.onChange.bind(this)} type="number" class="date" id="dias" />
            </div>

            <div className="item-form">
                <label>Descripción</label>
                <input value={this.state.descripcion} onChange={this.onChange.bind(this)} id="descripcion" type="text"/>
            </div>

            <div className="item-form">
                <label>Observación</label>
                <input value={this.state.observaciones} onChange={this.onChange.bind(this)} id="observacion" type="text"/>
            </div>
          </div>
          {this.props.area}

          <div className="module-form button">
            <div className="item-form button">
                <input type="submit" value="Enviar"/>
            </div>
          </div> 
        </div>  
      )

  }

}

export default Item