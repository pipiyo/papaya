import Reflux from 'reflux'
import InformeActions from '../actions/InformeActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}servicio` )

let InformeStore = Reflux.createStore({
  listenables: [InformeActions],

  viewInformes: function(data,cant,estado,codigo,vendedor,categoria,fechai,cliente,fechae){
  	socket.emit('viewInformes', data,cant,estado,codigo,vendedor,categoria,fechai,cliente,fechae)
  	socket.on('okViewInformes', (okViewInformes) =>{
  		this.trigger(okViewInformes)
  	})
  }

})

export default InformeStore



/*
    this.state = { 
                    view:100, 
                    sum:200, 
                    servicio:"", 
                    fechai: "",
                    fechae: "", 
                    codigo : "", 
                    estado : 'EN PROCESO', 
                    vendedor : "", 
                    categoria : "", 
                    cliente : "",
                    fechaInicio: undefined,
                    fechaEntrega:undefined
                  }

  servicio(servicio){
    switch (servicio) {
      case "abastecimiento":
          this.state.servicio = '"Adquisiciones"'
          break;
      case "despacho":
          this.state.servicio = '"Despacho"'
          break;
      case "sillas":
          this.state.servicio = '"Sillas"'
          break;
      case "instalación":
          this.state.servicio = '"Instalacion"'
          break;
      case "producción":
          this.state.servicio= '"Produccion"'
          break;
      case "técnica":
          this.state.servicio = '"Desarrollo"'
          break;
      case "planificación":
          this.state.servicio = '"Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas","Planificacion"'
          break;
      case "comercial":
          this.state.servicio = '"Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas"'
          break;
      case "reclamo":
          this.state.servicio = 'reclamo'
          break;
    }
    return this.state.servicio
  }
  filtro(e,name){
    let fechaI = document.getElementById("fechaInicio").value
    let fechaE = document.getElementById("fechaEntrega").value
    let codigo = document.getElementById("codigo").value
    let estado = document.getElementById("estado").value
    let vendedor = document.getElementById("vendedor").value
    let categoria = document.getElementById("categoria").value
    let cliente = document.getElementById("cliente").value

    if(codigo != ""){this.state.codigo=codigo}else{this.state.codigo = ""}
    if(vendedor != ""){this.state.vendedor=vendedor}else{this.state.vendedor= ""}   
    if(categoria != ""){this.state.categoria = categoria}else{this.state.categoria = ""}
    if(cliente != ""){this.state.cliente =  cliente }else{this.state.cliente = ""}
    if(fechaI != ""){this.state.fechai =  fechaI }else{this.state.fechai = ""}
    if(fechaE != ""){this.state.fechae =  fechaE }else{this.state.fechae = ""}
    this.state.estado = estado

    InformeActions.viewInformes(this.servicio(this.props.params.area),this.state.sum,this.state.estado,this.state.codigo,this.state.vendedor,this.state.categoria,this.state.fechai,this.state.cliente,this.state.fechae);
  }

  fechaInicioDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaInicio").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaInicio: date })
      this.filtro()
    }else{
      document.getElementById("fechaInicio").value = ""
      this.setState({ fechaInicio: undefined })
      this.filtro()
    }
  }

  fechaEntregaDate(date){
    if(moment(date).isValid()){
      document.getElementById("fechaEntrega").value = moment(date).format("YYYY-MM-DD")
      this.setState({ fechaEntrega: date })
      this.filtro()
    }else{
      document.getElementById("fechaEntrega").value = ""
      this.setState({ fechaEntrega: undefined })
      this.filtro()
    }
  }
  */