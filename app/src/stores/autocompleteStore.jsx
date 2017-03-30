import Reflux from 'reflux'
import AutocompleteActions from '../actions/AutocompleteActions'
import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}autocomplete` )

let AutocompleteStore = Reflux.createStore({
  listenables: [AutocompleteActions],
  obj: { 
    valores: [],
    input: null
  },
  getInitialState: function() {
    return this.obj
  },
  autocomplete: function(ev){
    let data = {
      complete:ev.target.dataset.complete,
      valor: ev.target.value
    }
    
    if(ev.target.value.length){
    	socket.emit('autocomplete',data,(n) => {
        this.obj.valores = n.datos
        this.obj.input = ev.target.id
        this.trigger(this.obj)
      }) 
    }else{
      this.obj.valores = []
      this.obj.input = null
      this.trigger(this.obj)
    }

  },
  autocompleteOK: function(ev,id,datos1,datos2,datos3,datos4,datos5,datos6,datosCantidad,datosTotalOC){
    document.getElementById(id).value = ev.target.text
    if(datos1){document.getElementById(datos1).value = ev.target.dataset.datos1}
    if(datos2){document.getElementById(datos2).value = ev.target.dataset.datos2}
    if(datos3){document.getElementById(datos3).value = ev.target.dataset.datos3} 
    if(datos4){document.getElementById(datos4).value = ev.target.dataset.datos4}
    if(datos5){document.getElementById(datos5).value = ev.target.dataset.datos5}
    if(datos6){document.getElementById(datos6).value = ev.target.dataset.datos6}
    if(datosCantidad){document.getElementById(datosCantidad).value = ev.target.dataset.cantidad}  
    if(datosTotalOC == "ok"){this.autocompleteTotalOC()} 
    if(datosTotalOC == "okupdate"){this.autocompleteTotalUpdateOC()}     
    this.obj.valores = []
    this.obj.input = null
    this.trigger(this.obj)
  },
  formatNumber : function(numero){
    return numero.replace(/[^0-9.]/g,'')
  },
  autocompleteTotalOC(){
    let count = document.querySelectorAll("[data-countemisionoc]").length
    let i, precio, cantidad , uno, descuento, dos, tres, cuatro, preciou, cinco
    let subtotal, descuentopor, descuentopes, iva, seis, siete, neto, ocho, tipoiva
    let totalfinal = 0
    for(i = 1; i <= count; i++){
      if(document.getElementById(`emisionoccantidad-${i}`) && document.getElementById(`emisionocpreciol-${i}`)){
        if(document.getElementById(`emisionoccodigo-${i}`).value.length > 0){
          cantidad = this.formatNumber(document.getElementById(`emisionoccantidad-${i}`).value)
          precio = this.formatNumber(document.getElementById(`emisionocpreciol-${i}`).value)
          descuento = this.formatNumber(document.getElementById(`emisionocdescuento-${i}`).value)
          preciou = this.formatNumber(document.getElementById(`emisionocpreciou-${i}`).value)

          uno  = parseInt(cantidad) * parseInt(precio)
          dos = (parseInt(uno) * parseInt(descuento)) / 100
          tres = parseInt(uno) - parseInt(dos)

          cuatro = (parseInt(precio) * parseInt(descuento)) / 100
          cinco = parseInt(precio) - parseInt(cuatro)

          document.getElementById(`emisionoccantidad-${i}`).value = cantidad
          document.getElementById(`emisionocpreciol-${i}`).value = precio
          document.getElementById(`emisionocpreciou-${i}`).value = (cinco)?cinco:precio

        
          if(descuento){
            document.getElementById(`emisionoctotal-${i}`).value = (tres)?tres:0
          }else{
            document.getElementById(`emisionoctotal-${i}`).value = (uno)?uno:0
          }
          totalfinal +=parseInt(document.getElementById(`emisionoctotal-${i}`).value)
        }
      }
    }
    document.getElementById(`emisionocsubtotal`).value = totalfinal

    subtotal = this.formatNumber(document.getElementById(`emisionocsubtotal`).value)
    descuentopor = this.formatNumber(document.getElementById(`emisionocdescuentopor`).value)
    descuentopes = this.formatNumber(document.getElementById(`emisionocdescuentopes`).value)

    if(descuentopor){
      seis = (parseInt(subtotal) * parseInt(descuentopor)) / 100
      seis = parseInt(subtotal) - parseInt(seis)
    }else{
      seis = subtotal
    }

    if(descuentopes){
      siete = (parseInt(seis) - parseInt(descuentopes))
    }else{
      siete = seis
    }

    document.getElementById(`emisionocneto`).value = siete

    iva = this.formatNumber(document.getElementById(`emisionociva`).value)
    tipoiva = document.getElementById(`emisionoctipoiva`).value
    neto = this.formatNumber(document.getElementById(`emisionocneto`).value)

    if(neto){
      if(tipoiva == "Iva"){
        ocho = parseInt(neto) * 19 / 100
        document.getElementById(`emisionociva`).value = ocho  
        document.getElementById(`emisionoctotalfinal`).value = parseInt(ocho) + parseInt(neto)
      }else if(tipoiva == "Iva Retenido"){
        document.getElementById(`emisionociva`).value = 0
        document.getElementById(`emisionoctotalfinal`).value = parseInt(neto)
      }else if(tipoiva == "Retencion"){
        ocho = parseInt(neto) * 10 / 100
        document.getElementById(`emisionociva`).value = ocho  
        document.getElementById(`emisionoctotalfinal`).value = parseInt(neto) - parseInt(ocho)
      }
    }
  
  },
  autocompleteTotalUpdateOC(){
    let count = document.querySelectorAll("[data-editaroc]").length
    let i, precio, cantidad , uno, descuento, dos, tres, cuatro, preciou, cinco
    let subtotal, descuentopor, descuentopes, iva, seis, siete, neto, ocho, tipoiva
    let totalfinal = 0
    for(i = 1; i <= count; i++){
      if(document.getElementById(`editaroccantidad-${i}`) && document.getElementById(`editarocpreciol-${i}`)){
        if(document.getElementById(`editaroccodigo-${i}`).value.length > 0){
          cantidad = this.formatNumber(document.getElementById(`editaroccantidad-${i}`).value)
          precio = this.formatNumber(document.getElementById(`editarocpreciol-${i}`).value)
          descuento = this.formatNumber(document.getElementById(`editarocdescuento-${i}`).value)
          preciou = this.formatNumber(document.getElementById(`editarocpreciou-${i}`).value)

          uno  = parseInt(cantidad) * parseInt(precio)
          dos = (parseInt(uno) * parseInt(descuento)) / 100
          tres = parseInt(uno) - parseInt(dos)

          cuatro = (parseInt(precio) * parseInt(descuento)) / 100
          cinco = parseInt(precio) - parseInt(cuatro)

          document.getElementById(`editaroccantidad-${i}`).value = cantidad
          document.getElementById(`editarocpreciol-${i}`).value = precio
          document.getElementById(`editarocpreciou-${i}`).value = (cinco)?cinco:precio

        
          if(descuento){
            document.getElementById(`editaroctotal-${i}`).value = (tres)?tres:0
          }else{
            document.getElementById(`editaroctotal-${i}`).value = (uno)?uno:0
          }
          totalfinal +=parseInt(document.getElementById(`editaroctotal-${i}`).value)
        }
      }
    }
    document.getElementById(`editarocsubtotal`).value = totalfinal

    subtotal = this.formatNumber(document.getElementById(`editarocsubtotal`).value)
    descuentopor = this.formatNumber(document.getElementById(`editarocdescuentopor`).value)
    descuentopes = this.formatNumber(document.getElementById(`editarocdescuentopes`).value)

    if(descuentopor){
      seis = (parseInt(subtotal) * parseInt(descuentopor)) / 100
      seis = parseInt(subtotal) - parseInt(seis)
    }else{
      seis = subtotal
    }

    if(descuentopes){
      siete = (parseInt(seis) - parseInt(descuentopes))
    }else{
      siete = seis
    }

    document.getElementById(`editarocneto`).value = siete

    iva = this.formatNumber(document.getElementById(`editarociva`).value)
    tipoiva = document.getElementById(`editaroctipoiva`).value
    neto = this.formatNumber(document.getElementById(`editarocneto`).value)

    if(neto){
      if(tipoiva == "Iva"){
        ocho = parseInt(neto) * 19 / 100
        document.getElementById(`editarociva`).value = ocho  
        document.getElementById(`editaroctotalfinal`).value = parseInt(ocho) + parseInt(neto)
      }else if(tipoiva == "Iva Retenido"){
        document.getElementById(`editarociva`).value = 0
        document.getElementById(`editaroctotalfinal`).value = parseInt(neto)
      }else if(tipoiva == "Retencion"){
        ocho = parseInt(neto) * 10 / 100
        document.getElementById(`editarociva`).value = ocho  
        document.getElementById(`editaroctotalfinal`).value = parseInt(neto) - parseInt(ocho)
      }
    }
  
  },
  autocompleteOff: function(ev){
    setTimeout(this.clear, 300)
  },
  clear: function(ev){
    this.obj.valores = []
    this.obj.input = null
    this.trigger(this.obj)
  }
})

export default AutocompleteStore