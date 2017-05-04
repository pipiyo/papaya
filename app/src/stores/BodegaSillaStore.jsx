import React from 'react'
import Reflux from 'reflux'

import { Link, browserHistory } from 'react-router'
import _ from 'lodash'

import BodegaSillaActions from '../actions/BodegaSillaActions'
import Env from '../Config'
import io from 'socket.io-client'

import Filtro from '../components/bodega-silla/Filtro.jsx'

import FiltroHijo from '../components/bodega-silla/FiltroHijo.jsx'

import Item from '../components/bodega-silla/Item.jsx'

import ItemHijo from '../components/bodega-silla/ItemHijo.jsx'

const socket = io.connect( `${Env.url}bodega-silla` )

let BodegaSillaStore = Reflux.createStore({
  
  listenables: [BodegaSillaActions],

  obj: { 
    bodega : "padre",
    renderItem: [],
    filtro: null,
    buscar: null,
    buscado: null,
    volver:null,
    total: 0,
    search:{
            limitA:0, 
            limitB:0,
            "cod":"", 
            des:"", 
            modelo: "", 
            cat:"", 
            pro: "", 
            pais: "", 
            proveedor: "", 
            mecanismo: "",
            respaldo: ""
          } 
  },

  listacolores: {

      T43: ["T43"],
      'PU Negro': ["PU NEGRO"],

        TF1:  ["Negro"],
        TF2:  ["Rojo"],
        TF3:  ["Azul"],
        TF4:  ["Café"],
        TF5:  ["Gris"],
        TF6:  ["Blanco"],
        TF7:  [""],
        TF8:  [""],
        TF9:  [""],
        TF10: [""],
        TF11: [
            "Negro",
            "Rojo",
            "Azul"
            ],
        TF12: [
            "Negro",
            "Gris"
            ],
        TF13: [
            "Negro",
            "Azul"
            ],  
        TF14: [
            "Negro",
            "Rojo"
            ],
        


      D: [
        "Butterfly",
        "Liga",
        "Pony",
        "Suerstart",
        "Turbo"
      ],





        M1: ["Negra"],
        M2: ["Blanca"],
        M3: ["Azul"],
        M4: ["Gris"],
        M5: ["Verde"],
        M6: ["Roja"],
        M7: ["Naranja"],
        M8: [""],
        M9: [""],
        M10:[""], 
        M11: [
            "Negro",
            "Blanco",
            "Azul",
            "Gris",
            "Roja"
            ],  
        M12: [
            "Azul claro",
            "Naranjo",
            "Gris"
            ],
        M13: [
            "Negro",
            "Blanco"
            ],
        M14: [
            "Negro",
            "Gris"
            ],
      


        Eco1: ["Negro"],
        Eco2: ["Blanco"],
        Eco3: ["Grafito"],
        Eco4: ["Arena"],
        Eco5: ["Cuero"],
        Eco6: [
            "Negro",
            "Blanco",
            "Grafito",
            "Arena"
            ],  
        Eco7: [
            "Negro",
            "Blanco"
            ],    
        Eco8: [
            "Negro",
            "Café"
            ],    
        Eco9: [""],


      T1: ["Glock"],
      T2: ["Escorial"],
      T3: ["Maroqui"],
      T4: ["Venetto"],
      T5: ["Venezia"],
      T6: ["Elasticity"],
      T7: ["Renna"],
      T8: ["Pegaso"],
      T9: ["Serrano"],
      T10:  ["Frontier"],
      T11:  ["Tacto Plus"],
      T12:  ["Cuero Natural"],
      T13:  ["Liberty"],
      T14:  ["Normandia"],
      T15:  ["Versalle"],
      T16:  ["Paris"],
      T17:  ["Coventry"],
      T18:  [""],
      T19:  [""],
      T20:  [
              "Glock",
              "Escorial",
              "Maroqui",
              "Venetto",
              "Venezia"
            ],
      T21: [
          "Elasticity",
          "Renna",
          "Pegaso",
          "Coventry"
          ],    
      T22: [
          "Renna",
          "Pegaso",
          "Coventry"
          ],    
      T23: [
          "Liberty",
          "Normandia",
          "Versalle",
          "Paris"
          ],    
      T24: [
          "Hilat",
          "Tacto Plus",
          "Serrano",
          "Renna",
          "Lana VC"
          ],

        P1: ["Negro"],
        P2: ["Blanco"],
        P3: ["Café"],
        P4: ["Gris"],
        P5: ["Azul"],
        P6: ["Beige"],
        P7: ["Amarillo"],
        P8: ["Naranjo"],
        P9: ["Rojo"],
        P10:  ["Verde"],
        P11:  ["Burdeo"],
        P12:  ["Marengo"],
        P13:  ["Sandia"],
        P14:  ["Guinda"],
        P15:  ["Arena"],
        P16:  ["Violeta"],
        P17:  ["Grafito"],
        P18:  ["Gris Claro"],
        P19:  [""],
        P20:  [""],
        P21: [
            "Negro",
            "Blanco",
            "Azul",
            "Beige",
            "Naranjo",
            "Rojo",
            "Verde"
            ],  
        P22: [
            "Negro",
            "Blanco",
            "Gris",
            "Azul",
            "Naranjo",
            "Rojo",
            "Verde",
            "Arena"
            ],    
        P23: [
            "Negro",
            "Blanco",
            "Gris"
            ],  
        P24: [
            "Negro",
            "Gris",
            "Azul",
            "Rojo",
            "Verde"
            ],  
        P25: [
            "Negro",
            "Blanco",
            "Gris",
            "Azul",
            "Naranjo",
            "Verde",
            "Arena"
            ],  
        P26: [
            "Negro",
            "Blanco",
            "Café",
            "Azul",
            "Rojo",
            "Violeta"
            ],  
        P27: [
            "Negro",
            "Blanco",
            "Café",
            "Azul",
            "Rojo",
            "Violeta"
            ],  
        P28: [
            "Negro",
            "Gris",
            "Azul",
            "Rojo"
            ],  
        P29: [
            "Beige",
            "Grafito"
            ],  
        P30: [
            "Negro",
            "Sandia"
            ],  
        P31: [
            "Negro",
            "Blanco"
            ],  
        P32: [
            "Negro",
            "Verde"
            ],  
        P33: [
            "Negro",
            "Verde",
            "Sandia"
            ],    
        P34: [
            "Café",
            "Azul",
            "Naranjo",
            "Verde",
            "Guinda"
            ],  
        P35: [
            "Café",
            "Azul",
            "Guinda"
            ],  
        P36: [
            "Negro",
            "Blanco",
            "Azul",
            "Amarillo",
            "Naranjo",
            "Rojo",
            "Verde"
            ],    
        P37: [
            "Negro",
            "Azul",
            "Amarillo",
            "Naranjo",
            "Gris"
            ],  
        P38: [
            "Blanco",
            "Gris",
            "Verde"
            ],  
        P39: [
            "Negro",
            "Rojo"
            ],  
        P40: [
            "Negro",
            "Blanco",
            "Rojo"
            ],  
        P41: [
            "Azul",
            "Blanco",
            "Rojo"
            ],  
        P42: [
            "Negro",
            "Azul"
            ],  
        P43: [
            "Negro",
            "Gris",
            "Azul",
            "Amarillo",
            "Naranjo",
            "Rojo",
            "Burdeo",
            "Verde Pistacho",
            "Verde Manzana",
            "Verde Esmeralda"
            ],    
        P44: [
            "Negro",
            "Gris",
            "Azul",
            "Blanco",
            "Rojo",
            "Verde Pistacho"
            ],  
        P45: [
            "Azul",
            "Verde"
            ],

      B1: ["Negro"],
      B2: ["Aluminizada"],
      B3: ["Cromada"],
      B4: ["Blanca"],
      B5: ["Charcole"],
      B6: ["Gris"],
      B7: ["Madera"],
      B8: [""],
      B9: [""],
      B10: [""],
      B11: [""],
      B12: [
          "Negro",
          "Aluminizada"   
          ],  
      B13: [
          "Negro",
          "Cromada" 
          ],    
      B14: [
          "Cromada",
          "Aluminizada"
          ],    
      B15: [
          "Negro",
          "Cromada",
          "Gris"
          ],      
      B16: [
          "Blanca",
          "Aluminizada"
          ],  
      B17: [
          "Gris",
          "Cromada"
          ],  
      B18: [
          "Aluminio",
          "Charcole"
          ],  
      B19: [
          "Negro",
          "Aluminio",
          "Cromada"
          ],

},

  init: function() {

  },

  getContent: function() {

  },

  getInitialState: function() {

    //return this.obj
  },

  renderBodegaSilla: function() {
    this.getBodegaSilla()
  },


  volver: function(  ) {

    this.getBodegaSilla()

  },

  filtroHijoSilla: function( event ) {
    event.preventDefault()

document.getElementById('botonVolverSilla').classList.remove('hidden')

  this.obj.volver = this.volver

    this.obj.filtro = <FiltroHijo 
                                  buscar={this.filtroHijoSilla}
                                  asiento={this.listacolores[this.obj.buscado_asiento]} 
                                  respaldo={this.listacolores[this.obj.buscado_respaldo]} 
                                  estructura={this.listacolores[this.obj.buscado_estructura]} />

    socket.emit('filtroHijoSilla', this.obj.buscado, ( (event.target.elements[0].value != 'x') ? `${this.obj.buscado_asiento},${event.target.elements[0].value}` : `` ) , ( (event.target.elements[1].value != 'x') ? `${this.obj.buscado_respaldo},${event.target.elements[1].value}` : `` ), ( (event.target.elements[2].value != 'x') ? `${this.obj.buscado_estructura},${event.target.elements[2].value}` : `` ) , ( productos ) => {
    this.obj.renderItem = []
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<ItemHijo 
                              key={producto.CODIGO_PRODUCTO}  
                              bodega={producto} />)
      })
      this.trigger(this.obj) 
    })

  },

  buscarHijoSilla: function( ev ) {
    this.obj.filtro = null
    this.obj.renderItem = []
    window.scrollTo(0, 0)
    this.obj.bodega = "hijo"
    this.obj.buscado = ev.target.dataset.codigo
    this.obj.buscadodes = ev.target.dataset.descripcion

this.obj.buscado_asiento = ev.target.dataset.asiento
this.obj.buscado_respaldo = ev.target.dataset.respaldo
this.obj.buscado_estructura = ev.target.dataset.estructura


    this.obj.buscar = this.filtroHijoSilla

    this.obj.volver = this.volver


    this.obj.filtro = <FiltroHijo 
                                  buscar={this.filtroHijoSilla} 
                                  asiento={this.listacolores[ev.target.dataset.asiento]} 
                                  respaldo={this.listacolores[ev.target.dataset.respaldo]} 
                                  estructura={this.listacolores[ev.target.dataset.estructura]} />

    document.getElementById('botonVolverSilla').classList.remove('hidden')

    socket.emit('buscarHijoSilla', ev.target.dataset.codigo,  ( productos ) => {
		
      _.map( productos, ( producto ) => {
              this.obj.renderItem.push(<ItemHijo 
              								key={producto.CODIGO_PRODUCTO}  
              								bodega={producto} />)
      })
      this.trigger(this.obj)
    })

  },

  buscar: function( event ) {
  	event.preventDefault()
    this.obj.buscado = null

 this.obj.search.limitB = 0

    if (document.getElementById('botonVolverSilla')) {
      document.getElementById('botonVolverSilla').classList.add('hidden')
    }

    this.obj.filtro = <Filtro buscar={this.buscar} />

    this.obj.renderItem = []

    this.obj.search.cod = event.target.elements[0].value
    this.obj.search.des = event.target.elements[1].value
    this.obj.search.modelo = event.target.elements[2].value
    this.obj.search.cat = event.target.elements[3].value
    this.obj.search.pro = event.target.elements[4].value
    this.obj.search.pais = event.target.elements[5].value
    this.obj.search.proveedor = event.target.elements[6].value
    this.obj.search.mecanismo = event.target.elements[7].value
    this.obj.search.respaldo = event.target.elements[8].value

    socket.emit('buscarBodegaSilla', 
                                  event.target.elements[0].value /*cod*/, 
                                  event.target.elements[1].value /*des*/,
                                  event.target.elements[2].value /*modelo*/, 
                                  event.target.elements[3].value /*cat*/,
                                  event.target.elements[4].value /*pro*/,
                                  event.target.elements[5].value /*pais*/,
                                  event.target.elements[6].value /*proveedor*/,
                                  event.target.elements[7].value /*mecanismo*/,
                                  event.target.elements[8].value /*respaldo*/, 
                                  this.obj.search.limitA,
                                  this.obj.search.limitB,( productos ) => {
		
    //this.obj.total = productos.cuenta
      _.map( productos.productos, ( producto, i ) => {
              this.obj.renderItem.push(<Item 
              								key={`${producto.CODIGO_PRODUCTO}${i}`}  
              								bodega={producto}
              								buscarHijoSilla={this.buscarHijoSilla}  />)
      })
      this.trigger(this.obj) 
    })

  },
  getBodegaSilla: function() {
    this.obj.search.cod = ""
    this.obj.search.des = ""
    this.obj.search.modelo = ""
    this.obj.search.cat = ""
    this.obj.search.pro = ""
    this.obj.search.pais = ""
    this.obj.search.proveedor = ""
    this.obj.search.mecanismo = ""
    this.obj.search.respaldo = ""

    this.obj.bodega = "padre"

    socket.emit('getBodegaSilla', ( productos ) => {
      this.obj.buscado = null
      this.obj.buscar = this.buscar

    this.obj.filtro = <Filtro buscar={this.buscar} />


      if (document.getElementById('botonVolverSilla')) {
        document.getElementById('botonVolverSilla').classList.add('hidden')
      }

      this.obj.renderItem = []
      //this.obj.total = productos.cuenta
      _.map( productos.productos, (producto, i) => {

              this.obj.renderItem.push(<Item 
              								key={`${producto.CODIGO_PRODUCTO}${i}`}  
              								bodega={producto}
              								buscarHijoSilla={this.buscarHijoSilla}  />)
      })
      this.trigger(this.obj) 
    })
  },
  renderViewMore: function(){
  if(this.obj.bodega == "padre"){
    this.obj.search.limitB += ( this.obj.search.limitB = 0 ) ? 0 : 50
      socket.emit('buscarBodegaSilla', 
                                    this.obj.search.cod,
                                    this.obj.search.des,
                                    this.obj.search.modelo, 
                                    this.obj.search.cat,
                                    this.obj.search.pro,
                                    this.obj.search.pais,
                                    this.obj.search.proveedor, 
                                    this.obj.search.mecanismo,
                                    this.obj.search.respaldo,
                                    this.obj.search.limitA, 
                                    this.obj.search.limitB, ( productos ) => {
        //this.obj.total = productos.cuenta

        _.map( productos.productos, ( producto, i ) => {
                this.obj.renderItem.push(<Item 
                                key={`${producto.CODIGO_PRODUCTO}${i}`}  
                                bodega={producto}
                                buscarHijoSilla={this.buscarHijoSilla}  />)
        })
        this.trigger(this.obj) 
      })
    }
  },
  renderButton: function(rows,sub){
    if(document.getElementById("view-more")){
      if(rows > sub){
        document.getElementById("view-more").classList.remove("hidden")
      }else{
        document.getElementById("view-more").classList.add("hidden")
      }
    }
  },


























  renderBodegaHijos: function (idProducto) {
    this.cleanState()
    this.getBodegaHijos(idProducto)
  },
  cleanState: function(){
    this.obj.renderItem = []
    this.obj.renderBodega = ''
    this.obj.filtro.limitA = 0
    this.obj.filtro.codigo = null
    this.obj.filtro.descripcion = null 
    this.obj.filtro.quiebre = false
    this.obj.filtro.desactivado = false 
    this.obj.filtro.bodega = false 
  },


  getBodegaHijos: function(idProducto){
    this.obj.filtrarColores = this.filtrarColores
    this.obj.filtro.codigo = idProducto
  

    socket.emit('getBodegaSilla',idProducto, this.obj.filtro, ( productos, cuenta ) => {

      this.obj.total = cuenta[0].total
      _.map( productos, (producto) => {
        _.map( producto, (p) => {
              this.obj.renderItem.push(<Item key={p.CODIGO_PRODUCTO} bodega={p}  />)
        })
      })  
      this.trigger(this.obj) 
    })
  },
  

})

export default BodegaSillaStore