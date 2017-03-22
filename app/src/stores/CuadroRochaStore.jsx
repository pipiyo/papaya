import React from 'react'

import Reflux from 'reflux'

import _ from 'lodash'
import moment from 'moment'
moment.locale('es')

import CuadroRochaActions from '../actions/CuadroRochaActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}cuadroRocha` )

let CuadroRochaStore = Reflux.createStore({
  listenables: [CuadroRochaActions],

  obj: {
    proyectos: [],
    showProyecto: null,
    showRocha: null,
    showServicio: null,
    showSubServicio: null,
    sillas: null,
    form: {
          ejecutivo: [],
          cliente: [] 
    },
    buscar: null,
    calendario: []
  },

  listaCss: {},

  renderProyectos: function() {

/*
socket.emit('getRochas', ( x, y ) => {
      _.forEach(y.cs, (vcs, kcs) => {
        this.listaCss[kcs] = { cs: vcs.cs, cp: vcs.cp, css: [] }
        _.forEach(y.css, (vcss, kcss) => {
          if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {
            this.listaCss[kcs].css.push( vcss.CODIGO_SUBSERVICIO )
          }
        })
      })
      _.forEach(y.np, (vnp, knp) => {
        this.obj.proyectos[knp] = { np: vnp, cp: [] } 
        _.forEach(y.cp, (vcp, kcp) => {
          if (vcp.np == vnp) {
            this.obj.proyectos[knp].cp.push( vcp )
          }
        })// cp
      })// np 
      _.forEach(this.obj.proyectos, (vnp, knp) => {
        _.forEach(this.obj.proyectos[knp].cp, (vcp, kcp) => {
          _.forEach(this.listaCss, (vcs, kcs) => {
            if (vcp.cp == vcs.cp) {
              this.obj.proyectos[knp].cp[kcp].cs.push( vcs )
            }
          })// cs
        })// cp
      })// np 
          return true
    })

  this.trigger( this.obj )
*/


  },

  init: function() {

  },

  getObj: function() {

    this.getProyectos('getRochas', null)


  },

  getInitialState: function() {

    this.getObj()

    return this.obj

  },

  showProyecto: function(e){
    CuadroRochaActions._showProyecto(e.target.textContent)
  },
  _showProyecto: function(e){
    let index = _.findIndex(this.obj.proyectos, { np: `${e}` })
    this.obj.proyectos[index].show = this.obj.proyectos[index].show ? false : true 
    this.trigger( this.obj )
  },




  showRocha: function(e){
    CuadroRochaActions._showRocha(e.target)
  },
  _showRocha: function(e){
    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  rocha: e.getAttribute('data-indexrocha')
                }


    this.obj.proyectos[index.proyecto].cp[index.rocha].show = this.obj.proyectos[index.proyecto].cp[index.rocha].show ? false : true 
    this.trigger( this.obj )
  },




  showServicio: function(e){
    CuadroRochaActions._showServicio(e.target)
  },
  _showServicio: function(e){

    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  servicio: e.getAttribute('data-indexservicio'),
                  rocha: e.getAttribute('data-indexrocha')
                }

    this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show = this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show ? false : true 
    this.trigger( this.obj )
  },




  showSubServicio: function(e){
    CuadroRochaActions._showSubServicio(e.target)
  },
  _showSubServicio: function(e){
    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  servicio: e.getAttribute('data-indexservicio'),
                  rocha: e.getAttribute('data-indexrocha')
                }
    this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show = this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show ? false : true 
    this.trigger( this.obj )
  },





  buscar: function(e) {
    e.preventDefault()
    CuadroRochaActions._buscar(e.target)
  },

  _buscar: function(e) {


    this.getProyectos('getRochaFiltro', e)


  },  






  sillas: function() {



let producto = {
          AC: "Accesorio",
          BA: "Base",
          BR: "Brazo",
          BU: "Butaca",
          CA: "Cabecero",
          ME: "Mesa",
          PA: "Paleta",
          PE: "Perchero",
          PI: "Piso Taburete",
          PO: "Pouf",
          RE: "Rejilla",
          RU: "Rueda",
          SA: "Silla Academica",
          SC: "Silla Cajero",
          SE: "Silla Ejecutiva",
          SF: "Sofa",
          SG: "Silla Gerencial",
          SI: "Silla Infantil",
          SM: "Silla Multiproposito",
          SO: "Silla Operativa",
          ST: "Silla Taburete",
          SV: "Silla Visita"
        }

let pais = {
      1: "Nacional",
      2: "Importado"
        }

let proveedor = {
          BO: "Bosen",
          CR: "Cerantola",
          CT: "Contatto",
          DA: "Dauphin",
          IN: "Indumac",
          KE: "Kebel",
          LI: "Liberona",
          MM: "Mmobili",
          MU: "MUMA",
          NS: "Nowy Styl",
          OM: "OMP",
          SI: "Situp",
          ST: "Starway",
          VC: "VC Industrial"
        }

let mecanismo = {
          1:  { name: "1 cuerpo", cod: "01" },
          2:  { name: "2 cuerpo", cod: "02" },
          3:  { name: "3 cuerpo", cod: "03" },
          4:  { name: "4 cuerpo", cod: "04" },
          5:  { name: "5 cuerpo", cod: "05" },
          6:  { name: "6 cuerpo", cod: "06" },
          7:  { name: "Trineo", cod: "07" },
          8:  { name: "fijo", cod: "08" },
          9:  { name: "4 patas", cod: "09" },
          10: { name: "pedestal", cod: "10" },
          11: { name: "Pivotal", cod: "11" },
          12: { name: "plato", cod: "12" },
          13: { name: "plegable", cod: "13" },
          14: { name: "Reclinable", cod: "14" },
          15: { name: "Regulable", cod: "15" },
          16: { name: "Syncro", cod: "16" },
          17: { name: "Abatible", cod: "17" },
          18: { name: "Giratoria", cod: "18" }
        }

let respaldo = {
          A:  "Alto",
          M:  "Medio",
          B:  "Bajo"
        }

/////COLORES

let tapiz_fabrica = {
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
            ]
        }

let diseño = {
      D: [
        "Butterfly",
        "Liga",
        "Pony",
        "Suerstart",
        "Turbo"
      ]
} 



let malla = {
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
            ]
      }

let ecocuero = {
        Eco1: ["Negro"],
        Eco2: ["Blanco"],
        Eco3: ["Grafito"],
        Eco4: ["Arena"],
        Eco5: [""],
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
            ]
      }

let tapiz = {
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
      T20:  [""],
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
          ] 
      }

  
let hilat = {
              Hilat: [
                  "Glock",
                  "Escorial",
                  "Maroqui",
                  "Venetto",
                  "Venezia",
                  "Cristal"
              ],
              PU: [
                  "PU Negro"
              ]
        }

let Polipropileno = {
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
        P18:  [""],
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
            "Café ",
            "Azul",
            "Naranjo",
            "Verde",
            "Guinda"
            ],  
        P35: [
            "Café ",
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
            ]
      }



let base = {
      B1: ["Negro"],
      B2: ["Aluminizada"],
      B3: ["Cromada"],
      B4: ["Blanca"],
      B5: ["Charcole"],
      B6: ["Gris"],
      B7: [""],
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
          ]
      }




let listacolores = {

      Cristal: ["Cristal"],

      Gris: ["Gris"],

      D: [
        "Butterfly",
        "Liga",
        "Pony",
        "Suerstart",
        "Turbo"
      ],


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
        Eco5: [""],
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
      T20:  [""],
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

              Hilat: [
                  "Glock",
                  "Escorial",
                  "Maroqui",
                  "Venetto",
                  "Venezia",
                  "Cristal",
                  "PU Negro"
              ],
              PU: [
                  "PU Negro"
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
        P18:  [""],
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
            "Café ",
            "Azul",
            "Naranjo",
            "Verde",
            "Guinda"
            ],  
        P35: [
            "Café ",
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
      B7: [""],
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

      T43: ["T43"]


}

///////////////SILLAS


let sillas = [
                {"cod":"SA2BO.01.18.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"BO","name":"Bosen"},"modelo":{"cod":1,"name":"Nodo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P45","respaldocolor":"P45","estructura":"B6","des":"Silla Academica modelo Nodo, Giratoria, respaldo Bajo"},{"cod":"SV2BO.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"BO","name":"Bosen"},"modelo":{"cod":2,"name":"Bella"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Visita modelo Bella, 4 patas, respaldo Bajo"},{"cod":"SE1CR.04.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Leep"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Leep, Syncro, respaldo Alto"},{"cod":"SE1CR.05.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Skate"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"M1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Skate, Syncro, respaldo Medio"},{"cod":"SG1CR.01.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Ben"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Gerencial modelo Ben, Reclinable, respaldo Alto"},{"cod":"SG1CR.02.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Morfeo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Gerencial modelo Morfeo, Reclinable, respaldo Alto"},{"cod":"SO1CR.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Torino"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo Torino, Pivotal, respaldo Alto"},{"cod":"SO1CR.02.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Torino"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo Torino, Syncro, respaldo Alto"},{"cod":"SO1CR.03.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Syriana"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Syriana, Syncro, respaldo Medio"},{"cod":"SE1CR.01.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Line"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Reclinable, respaldo Alto"},{"cod":"SE1CR.02.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Line"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Reclinable, respaldo Medio"},{"cod":"SE1CR.03.07.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Line"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Trineo, respaldo Medio"},{"cod":"SO1CR.04.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Flash"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, Pivotal, respaldo Alto"},{"cod":"SO1CR.05.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Flash"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, Syncro, respaldo Alto"},{"cod":"SO1CR.06.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"Flash"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, Pivotal, respaldo Medio"},{"cod":"SO1CR.07.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":7,"name":"Flash"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, Syncro, respaldo Medio"},{"cod":"SV1CR.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Shell"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P21","respaldocolor":"P21","estructura":"B3","des":"Silla Visita modelo Shell, 4 patas, respaldo Bajo"},{"cod":"SV1CR.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Strike"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P22","respaldocolor":"P22","estructura":"B3","des":"Silla Visita modelo Strike, 4 patas, respaldo Bajo"},{"cod":"SV1CR.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Break"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P27","respaldocolor":"P27","estructura":"B3","des":"Silla Visita modelo Break, 4 patas, respaldo Bajo"},{"cod":"SV1CR.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Kyos sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Kyos con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"Kyos sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":7,"name":"Kyos con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":8,"name":"Kyos sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":9,"name":"Kyos con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":10,"name":"Kyos sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P23","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":11,"name":"Kyos con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P23","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.12.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":12,"name":"Dream sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.13.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":13,"name":"Dream con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.14.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":14,"name":"Dream sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.15.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":15,"name":"Dream con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":16,"name":"Dream sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":17,"name":"Dream con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.18.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":18,"name":"Dream sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P24","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":19,"name":"Dream con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P24","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":20,"name":"Iso Revolution sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.21.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":21,"name":"Iso Revolution con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.22.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":22,"name":"Iso Revolution sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.23.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":23,"name":"Iso Revolution con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.24.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":24,"name":"Iso Revolution sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.25.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":25,"name":"Iso Revolution con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.26.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":26,"name":"Iso Revolution sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P25","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.27.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":27,"name":"Iso Revolution con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P25","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"BU1CT.01.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.02.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.03.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.04.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.05.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.06.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.07.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.08.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.09.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.10.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.11.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.12.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.13.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.14.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.15.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.16.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.17.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.18.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.19.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.20.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.21.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.22.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.23.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.24.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.25.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.26.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.27.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.28.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.29.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.30.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.31.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.32.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":32,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.33.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":33,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.34.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":34,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.35.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":35,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.36.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":36,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.37.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":37,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.38.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":38,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.39.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":39,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.40.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":40,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.41.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":41,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.42.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":42,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.43.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":43,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.44.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":44,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.45.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":45,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.46.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":46,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.47.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":47,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.48.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":48,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.49.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":49,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.50.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":50,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.51.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":51,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.52.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":52,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.53.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":53,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.54.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":54,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.55.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":55,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.56.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":56,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.57.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":57,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.58.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":58,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.59.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":59,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.60.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":60,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.61.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":61,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.62.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":62,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.63.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":63,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.64.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":64,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.65.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":65,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.66.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":66,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.67.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":67,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.68.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":68,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.69.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":69,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.70.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":70,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.71.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":71,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.72.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":72,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"SC1CT.01.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Rudy aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, Pivotal, respaldo Medio"},{"cod":"SC1CT.02.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Speed aro Cromado"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, Pivotal, respaldo Medio"},{"cod":"SC1CT.03.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Speed aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, Pivotal, respaldo Medio"},{"cod":"SC1CT.04.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Tulip aro Cromado"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"PU","respaldocolor":"PU","estructura":"B1","des":"Silla Cajero modelo Tulip aro Cromado, Pivotal, respaldo Medio"},{"cod":"SC1CT.05.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Tulip aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"PU","respaldocolor":"PU","estructura":"B1","des":"Silla Cajero modelo Tulip aro Nylon, Pivotal, respaldo Medio"},{"cod":"SC1CT.06.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Prisma aro Cromado"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo Prisma aro Cromado, Pivotal, respaldo Medio"},{"cod":"SC1CT.07.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Prisma aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo Prisma aro Nylon, Pivotal, respaldo Medio"},{"cod":"SC1CT.08.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Isosceles aro cromado"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Isosceles aro cromado, Giratoria, respaldo Medio"},{"cod":"SC1CT.09.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Isosceles aro Nylon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Isosceles aro Nylon, Giratoria, respaldo Medio"},{"cod":"SC1CT.10.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"NovaIso aro cromado"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo NovaIso aro cromado, Giratoria, respaldo Medio"},{"cod":"SC1CT.11.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"NovaIso aro nylon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo NovaIso aro nylon, Giratoria, respaldo Medio"},{"cod":"SE1CT.12.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Beauty"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Beauty, Syncro, respaldo Medio"},{"cod":"SE1CT.13.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Belgica"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Belgica, Reclinable, respaldo Medio"},{"cod":"SE1CT.14.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Cinque"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Ejecutiva modelo Cinque, Syncro, respaldo Medio"},{"cod":"SE1CT.15.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Cinque"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Ejecutiva modelo Cinque, Syncro, respaldo Alto"},{"cod":"SE1CT.16.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Rebbel sin cabecero, con brazo 3D"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo 3D, Syncro, respaldo Alto"},{"cod":"SE1CT.17.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Rebbel con cabecero, con brazo 3D"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo 3D, Syncro, respaldo Alto"},{"cod":"SE1CT.18.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Rebbel sin cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo regulable, Syncro, respaldo Alto"},{"cod":"SE1CT.19.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Rebbel con cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo regulable, Syncro, respaldo Alto"},{"cod":"SE1CT.20.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Rebbel sin cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo regulable, Syncro, respaldo Medio"},{"cod":"SE1CT.21.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Rebbel con cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo regulable, Syncro, respaldo Medio"},{"cod":"SE1CT.22.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"E-chair"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B18","des":"Silla Ejecutiva modelo E-chair, Syncro, respaldo Alto"},{"cod":"SE1CT.23.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"E-chair"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B18","des":"Silla Ejecutiva modelo E-chair, Syncro, respaldo Alto"},{"cod":"SE1CT.24.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Join"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Join, Syncro, respaldo Alto"},{"cod":"SE1CT.25.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Join Blanca"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M2","estructura":"B2","des":"Silla Ejecutiva modelo Join Blanca, Syncro, respaldo Alto"},{"cod":"SE1CT.26.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Daniela"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Daniela, Reclinable, respaldo Medio"},{"cod":"SE1CT.27.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Daniela"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Daniela, Reclinable, respaldo Alto"},{"cod":"SE1CT.28.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Master"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Master, Reclinable, respaldo Alto"},{"cod":"SE1CT.29.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Manager"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Manager, Reclinable, respaldo Alto"},{"cod":"SE1CT.30.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Director"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Director, Reclinable, respaldo Alto"},{"cod":"SE1CT.31.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Tuono"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Tuono, Reclinable, respaldo Alto"},{"cod":"SE1CT.32.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":32,"name":"Tuono"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Ejecutiva modelo Tuono, Reclinable, respaldo Alto"},{"cod":"SE1CT.33.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":33,"name":"Elegance"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Elegance, Reclinable, respaldo Alto"},{"cod":"SE1CT.34.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":34,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SE1CT.35.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":35,"name":"Loop"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Loop, Syncro, respaldo Alto"},{"cod":"SE1CT.36.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":36,"name":"Black"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Black, Syncro, respaldo Alto"},{"cod":"SE1CT.37.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":37,"name":"Logic"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Logic, Reclinable, respaldo Medio"},{"cod":"SE1CT.38.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":38,"name":"Fast"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Fast, Reclinable, respaldo Alto"},{"cod":"SE1CT.39.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":39,"name":"Ergohuman Malla"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"M1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Malla, Syncro, respaldo Alto"},{"cod":"SE1CT.40.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":40,"name":"Ergohuman Tapizada"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Tapizada, Syncro, respaldo Alto"},{"cod":"SE1CT.41.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":41,"name":"Ergohuman Malla con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"M1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Malla con cabecero, Syncro, respaldo Alto"},{"cod":"SE1CT.42.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":42,"name":"Ergohuman Tapizada sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Tapizada sin cabecero, Syncro, respaldo Alto"},{"cod":"SE1CT.43.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":43,"name":"Atton"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco6","respaldocolor":"Eco6","estructura":"B3","des":"Silla Ejecutiva modelo Atton, Reclinable, respaldo Medio"},{"cod":"SE1CT.44.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":44,"name":"Atton"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Atton, Reclinable, respaldo Alto"},{"cod":"SG1CT.01.16.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Vapor con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Gerencial modelo Vapor con cabecero, Syncro, respaldo Alto"},{"cod":"SG1CT.02.16.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Vapor sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Gerencial modelo Vapor sin cabecero, Syncro, respaldo Alto"},{"cod":"SO1CT.01.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Lampo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Lampo, Reclinable, respaldo Medio"},{"cod":"SO1CT.02.18.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Lampo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Lampo, Giratoria, respaldo Medio"},{"cod":"SO1CT.03.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Y10"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Y10, Syncro, respaldo Medio"},{"cod":"SO1CT.04.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Y10"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Y10, Syncro, respaldo Alto"},{"cod":"SO1CT.05.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Q3"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3, Syncro, respaldo Alto"},{"cod":"SO1CT.06.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Q3 TWO"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 TWO, Syncro, respaldo Alto"},{"cod":"SO1CT.07.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Aviator"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, Pivotal, respaldo Medio"},{"cod":"SO1CT.08.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Aviator"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, Pivotal, respaldo Alto"},{"cod":"SO1CT.09.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Aviator"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, Syncro, respaldo Medio"},{"cod":"SO1CT.10.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Aviator"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, Syncro, respaldo Alto"},{"cod":"SO1CT.11.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Torino"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, Pivotal, respaldo Medio"},{"cod":"SO1CT.12.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Torino"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, Pivotal, respaldo Alto"},{"cod":"SO1CT.13.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Torino"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, Syncro, respaldo Medio"},{"cod":"SO1CT.14.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Torino"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, Syncro, respaldo Alto"},{"cod":"SO1CT.15.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Alex"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, Pivotal, respaldo Alto"},{"cod":"SO1CT.16.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Alex"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, Pivotal, respaldo Medio"},{"cod":"SO1CT.17.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Rudy"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, Pivotal, respaldo Alto"},{"cod":"SO1CT.18.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Rudy"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, Pivotal, respaldo Medio"},{"cod":"SO1CT.19.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Syriana"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Syriana, Reclinable, respaldo Medio"},{"cod":"SO1CT.20.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Syriana"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Syriana, Syncro, respaldo Medio"},{"cod":"SO1CT.21.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Bend brazo fijo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Bend brazo fijo, Reclinable, respaldo Medio"},{"cod":"SO1CT.22.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Bend brazo regulable"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Bend brazo regulable, Reclinable, respaldo Medio"},{"cod":"SO1CT.23.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"New Bend"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo New Bend, Reclinable, respaldo Medio"},{"cod":"SO1CT.24.09.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Lady"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Lady, 4 patas, respaldo Bajo"},{"cod":"SO1CT.25.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Lady"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Lady, Reclinable, respaldo Bajo"},{"cod":"SO1CT.26.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Lady estructura blanca"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"M12","estructura":"B4","des":"Silla Operativa modelo Lady estructura blanca, Reclinable, respaldo Bajo"},{"cod":"SO1CT.27.18.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Genova"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Genova, Giratoria, respaldo Medio"},{"cod":"SO1CT.28.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Genova"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Genova, Reclinable, respaldo Medio"},{"cod":"SO1CT.29.18.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Tulip"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"PU","respaldocolor":"PU","estructura":"B1","des":"Silla Operativa modelo Tulip, Giratoria, respaldo Bajo"},{"cod":"SO1CT.30.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Q9 estructura Blanca"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B2","des":"Silla Operativa modelo Q9 estructura Blanca, Reclinable, respaldo Medio"},{"cod":"SO1CT.31.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Q9"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q9, Reclinable, respaldo Medio"},{"cod":"ST1CT.01.09.M","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Paco"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P29","respaldocolor":"P29","estructura":"B3","des":"Silla Taburete modelo Paco, 4 patas, respaldo Medio"},{"cod":"SV1CT.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Vigo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M13","estructura":"B6","des":"Silla Visita modelo Vigo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.02.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Q9 estructura Blanca"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9 estructura Blanca, Trineo, respaldo Medio"},{"cod":"SV1CT.03.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Q9"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9, Trineo, respaldo Medio"},{"cod":"SV1CT.04.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Rebbel"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Visita modelo Rebbel, Trineo, respaldo Medio"},{"cod":"SV1CT.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Pinko"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Pinko, 4 patas, respaldo Bajo"},{"cod":"SV1CT.06.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Pinko"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Pinko, Trineo, respaldo Bajo"},{"cod":"SV1CT.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Urban"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Urban, 4 patas, respaldo Bajo"},{"cod":"SV1CT.08.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Urban"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Urban, Trineo, respaldo Bajo"},{"cod":"SV1CT.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Butterfly con brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Butterfly sin brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Butterfly con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.12.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Butterfly sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.13.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Butterfly con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.14.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Butterfly sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.15.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Thea"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B3","des":"Silla Visita modelo Thea, Trineo, respaldo Bajo"},{"cod":"SV1CT.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"850 con brazo recto"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 850 con brazo recto, 4 patas, respaldo Bajo"},{"cod":"SV1CT.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"870 sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 870 sin brazo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.18.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"870 con brazo curvo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 870 con brazo curvo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Prisma sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo Prisma sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Prisma con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo Prisma con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.21.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Isonet sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B12","des":"Silla Visita modelo Isonet sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CT.22.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Isonet con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B12","des":"Silla Visita modelo Isonet con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CT.23.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Isoscele sin brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B12","des":"Silla Visita modelo Isoscele sin brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.24.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Isoscele con brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B12","des":"Silla Visita modelo Isoscele con brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.25.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Strong"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T6","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Strong, 4 patas, respaldo Bajo"},{"cod":"SV1CT.26.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Layer sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B12","des":"Silla Visita modelo Layer sin brazo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.27.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Layer con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B12","des":"Silla Visita modelo Layer con brazo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.28.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"NovaIso Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo NovaIso Polipropileno, 4 patas, respaldo Bajo"},{"cod":"SV1CT.29.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Rebbel"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Rebbel, Trineo, respaldo Bajo"},{"cod":"SF1CT.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Marion"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T22","respaldocolor":"T22","estructura":"T22","des":"Sofa modelo Marion, 1 cuerpo, respaldo Bajo"},{"cod":"SF1CT.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Marion"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T22","respaldocolor":"T22","estructura":"T22","des":"Sofa modelo Marion, 2 cuerpo, respaldo Bajo"},{"cod":"SF1CT.03.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Alessandra"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T7","respaldocolor":"T7","estructura":"T7","des":"Sofa modelo Alessandra, 1 cuerpo, respaldo Bajo"},{"cod":"SF1CT.04.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Alessandra"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T7","respaldocolor":"T7","estructura":"T7","des":"Sofa modelo Alessandra, 2 cuerpo, respaldo Bajo"},{"cod":"SF1CT.05.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Murano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 1 cuerpo, respaldo Bajo"},{"cod":"SF1CT.06.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Murano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1CT.07.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Murano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 3 cuerpo, respaldo Bajo"},{"cod":"SE2DA.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Fun-on"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF11","respaldocolor":"TF11","estructura":"B1","des":"Silla Ejecutiva modelo Fun-on, Syncro, respaldo Alto"},{"cod":"SE2DA.02.16.B","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":2,"name":"Shape"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"TF5","estructura":"B1","des":"Silla Ejecutiva modelo Shape, Syncro, respaldo Bajo"},{"cod":"SE2DA.03.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":3,"name":"Strike"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Strike, Syncro, respaldo Alto"},{"cod":"SE2DA.04.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":4,"name":"Valo Sync"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF12","respaldocolor":"M14","estructura":"B1","des":"Silla Ejecutiva modelo Valo Sync, Syncro, respaldo Medio"},{"cod":"SE2DA.05.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":5,"name":"Valo Sync Tapizada"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF12","respaldocolor":"TF12","estructura":"B1","des":"Silla Ejecutiva modelo Valo Sync Tapizada, Syncro, respaldo Medio"},{"cod":"SE2DA.06.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":6,"name":"Vit-o Confort"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF11","respaldocolor":"TF11","estructura":"B1","des":"Silla Ejecutiva modelo Vit-o Confort, Syncro, respaldo Alto"},{"cod":"SE2DA.07.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":7,"name":"Coco"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Ejecutiva modelo Coco, Syncro, respaldo Medio"},{"cod":"SO2DA.01.11.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Vida"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Operativa modelo Vida, Pivotal, respaldo Bajo"},{"cod":"SV2DA.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Valo Visita 4 patas"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Visita modelo Valo Visita 4 patas, 4 patas, respaldo Bajo"},{"cod":"SV1IN.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":1,"name":"Malba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P3","respaldocolor":"P3","estructura":"P3","des":"Silla Visita modelo Malba, 4 patas, respaldo Bajo"},{"cod":"SV1IN.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":2,"name":"Vigo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P30","respaldocolor":"P30","estructura":"P30","des":"Silla Visita modelo Vigo, 4 patas, respaldo Bajo"},{"cod":"SV1IN.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":3,"name":"Todi"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P31","respaldocolor":"P31","estructura":"P31","des":"Silla Visita modelo Todi, 4 patas, respaldo Bajo"},{"cod":"SV1IN.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":4,"name":"Radi"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P32","respaldocolor":"P32","estructura":"P32","des":"Silla Visita modelo Radi, 4 patas, respaldo Bajo"},{"cod":"SV1IN.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":5,"name":"Florencia"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P33","respaldocolor":"P33","estructura":"P33","des":"Silla Visita modelo Florencia, 4 patas, respaldo Bajo"},{"cod":"SV1IN.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":6,"name":"Dawy"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"P2","des":"Silla Visita modelo Dawy, 4 patas, respaldo Bajo"},{"cod":"SV1IN.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":7,"name":"Ergosilla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P34","respaldocolor":"P34","estructura":"B2","des":"Silla Visita modelo Ergosilla, 4 patas, respaldo Bajo"},{"cod":"SV1IN.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IN","name":"Indumac"},"modelo":{"cod":8,"name":"Isonorma"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P35","respaldocolor":"P35","estructura":"B2","des":"Silla Visita modelo Isonorma, 4 patas, respaldo Bajo"},{"cod":"SE2KE.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SE2KE.02.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":2,"name":"Black"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Black, Syncro, respaldo Alto"},{"cod":"SO2KE.01.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Look"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Look, Pivotal, respaldo Medio"},{"cod":"BU1LI.01.01.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Fiona"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 1 cuerpo, respaldo Bajo"},{"cod":"BU1LI.02.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Fiona"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 2 cuerpo, respaldo Bajo"},{"cod":"BU1LI.03.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"Fiona"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 3 cuerpo, respaldo Bajo"},{"cod":"PO1LI.01.08","producto":{"cod":"PO","name":"Pouf"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Fiona"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Pouf modelo Fiona"},{"cod":"SE1LI.01.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Business"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Business, Reclinable, respaldo Medio"},{"cod":"SE1LI.02.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"New Jazz"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo New Jazz, Reclinable, respaldo Medio"},{"cod":"SE1LI.03.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"New Jazz"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo New Jazz, Reclinable, respaldo Alto"},{"cod":"SE1LI.04.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":4,"name":"Luxor"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco7","respaldocolor":"Eco7","estructura":"B3","des":"Silla Ejecutiva modelo Luxor, Reclinable, respaldo Medio"},{"cod":"SE1LI.05.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":5,"name":"Luxor"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco7","respaldocolor":"Eco7","estructura":"B3","des":"Silla Ejecutiva modelo Luxor, Reclinable, respaldo Alto"},{"cod":"SO1LI.01.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Cosmo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Cosmo, Reclinable, respaldo Medio"},{"cod":"SV1LI.01.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Business"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Visita modelo Business, Trineo, respaldo Medio"},{"cod":"SV1LI.02.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Luxor"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Visita modelo Luxor, Trineo, respaldo Medio"},{"cod":"SF1LI.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Master"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Master"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.03.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"Master"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.04.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":4,"name":"Murano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.05.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":5,"name":"Murano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.06.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":6,"name":"Murano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.07.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":7,"name":"Milano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.08.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":8,"name":"Milano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.09.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":9,"name":"Milano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.10.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":10,"name":"Chic"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.11.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":11,"name":"Chic"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.12.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":12,"name":"Chic"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.13.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":13,"name":"Gauthier"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.14.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":14,"name":"Gauthier"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.15.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":15,"name":"Gauthier"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 3 cuerpo, respaldo Bajo"},{"cod":"SF1MM.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":1,"name":"Roma"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 1 cuerpo, respaldo Bajo"},{"cod":"SF1MM.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":2,"name":"Roma"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 2 cuerpo, respaldo Bajo"},{"cod":"SF1MM.03.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":3,"name":"Roma"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 3 cuerpo, respaldo Bajo"},{"cod":"SF1MM.04.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":4,"name":"Venecia"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Venecia, 2 cuerpo, respaldo Bajo"},{"cod":"SA2MU.01.09.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"Mariposa"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P37","respaldocolor":"P37","estructura":"B2","des":"Silla Academica modelo Mariposa, 4 patas, respaldo Bajo"},{"cod":"SM2MU.01.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"IO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P36","respaldocolor":"P37","estructura":"B2","des":"Silla Multiproposito modelo IO, 4 patas, respaldo Bajo"},{"cod":"SM2MU.02.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":2,"name":"Juga"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P38","respaldocolor":"P38","estructura":"P38","des":"Silla Multiproposito modelo Juga, 4 patas, respaldo Bajo"},{"cod":"SM2MU.03.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":3,"name":"Mariposa"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P37","respaldocolor":"P37","estructura":"B2","des":"Silla Multiproposito modelo Mariposa, 4 patas, respaldo Bajo"},{"cod":"SM2MU.04.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":4,"name":"Menta"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P39","respaldocolor":"P40","estructura":"B3","des":"Silla Multiproposito modelo Menta, 4 patas, respaldo Bajo"},{"cod":"ST2MU.01.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"IO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P36","respaldocolor":"P36","estructura":"B2","des":"Silla Taburete modelo IO, 4 patas, respaldo Bajo"},{"cod":"ST2MU.02.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":2,"name":"Menta"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P39","respaldocolor":"P40","estructura":"B3","des":"Silla Taburete modelo Menta, 4 patas, respaldo Bajo"},{"cod":"BU2NS.01.08.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Estadio Omega"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P41","respaldocolor":"P41","estructura":"P41","des":"Butaca modelo Estadio Omega, Fijo, respaldo Bajo"},{"cod":"BU2NS.01.01.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"CLUB 1 cuerpo"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 1 cuerpo, 1 cuerpo, respaldo Bajo"},{"cod":"BU2NS.02.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"CLUB 2 cuerpo"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 2 cuerpo, 2 cuerpo, respaldo Bajo"},{"cod":"BU2NS.03.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"CLUB 3 cuerpo"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 3 cuerpo, 3 cuerpo, respaldo Bajo"},{"cod":"BU2NS.04.09.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Hello 1 cuerpo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 1 cuerpo, 4 patas, respaldo Bajo"},{"cod":"BU2NS.05.12.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"Hello 1 cuerpo"},"mecanismo":{"cod":12,"name":"plato"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 1 cuerpo, plato, respaldo Bajo"},{"cod":"BU2NS.06.09.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"Hello 2 cuerpo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 2 cuerpo, 4 patas, respaldo Bajo"},{"cod":"SA2NS.01.09.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Samba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Academica modelo Samba, 4 patas, respaldo Bajo"},{"cod":"SC2NS.01.11.B","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Nargo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B1","des":"Silla Cajero modelo Nargo, Pivotal, respaldo Bajo"},{"cod":"SC2NS.02.11.B","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Smart"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Cajero modelo Smart, Pivotal, respaldo Bajo"},{"cod":"SE2NS.01.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Feniks"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Feniks, Reclinable, respaldo Alto"},{"cod":"SI2NS.01.18.B","producto":{"cod":"SI","name":"Silla Infantil"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Catoon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"D","respaldocolor":"D","estructura":"B1","des":"Silla Infantil modelo Catoon, Giratoria, respaldo Bajo"},{"cod":"SO2NS.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Jupiter"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Operativa modelo Jupiter, Pivotal, respaldo Alto"},{"cod":"SO2NS.02.11.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Smart"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Operativa modelo Smart, Pivotal, respaldo Bajo"},{"cod":"SO2NS.03.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Taktik"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Taktik, Pivotal, respaldo Alto"},{"cod":"SV2NS.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Samba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Visita modelo Samba, 4 patas, respaldo Bajo"},{"cod":"SV2NS.02.18.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Samba"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Visita modelo Samba, Giratoria, respaldo Bajo"},{"cod":"SC2KE.01.18","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Work"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"","name":""},"asiento":"PU","respaldocolor":"","estructura":"B1","des":"Silla Cajero modelo Work, Giratoria, respaldo"},{"cod":"ST1LI.02.18","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Serrano"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"","name":""},"asiento":"Eco1","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo Serrano, Giratoria, respaldo"},{"cod":"ME2NS.01","producto":{"cod":"ME","name":"Mesa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"TUTTI 55 x 110"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"Cristal","respaldocolor":"","estructura":"B3","des":"Mesa modelo TUTTI 55 x 110"},{"cod":"ME2NS.02","producto":{"cod":"ME","name":"Mesa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"TUTTI 55 x 55"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"Cristal","respaldocolor":"","estructura":"B3","des":"Mesa modelo TUTTI 55 x 55"},{"cod":"ST2NS.04.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Jola"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo Jola, 4 patas, respaldo Bajo"},{"cod":"ST2NS.01.10","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"ZETA"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo ZETA, pedestal, respaldo"},{"cod":"SV2NS.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Ascona"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Ascona, 4 patas, respaldo Bajo"},{"cod":"SV2NS.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"ISO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B19","des":"Silla Visita modelo ISO, 4 patas, respaldo Bajo"},{"cod":"SV2NS.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"ISO Plastik"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P42","respaldocolor":"P42","estructura":"B19","des":"Silla Visita modelo ISO Plastik, 4 patas, respaldo Bajo"},{"cod":"SV2NS.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"ISONET"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF3","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo ISONET, 4 patas, respaldo Bajo"},{"cod":"SV2NS.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":7,"name":"Silla Kalina"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Kalina, 4 patas, respaldo Bajo"},{"cod":"SV2NS.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":8,"name":"Silla Tulipan"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Tulipan, 4 patas, respaldo Bajo"},{"cod":"SV2NS.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":9,"name":"Silla Venus"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Venus, 4 patas, respaldo Bajo"},{"cod":"SV2NS.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":10,"name":"Styl con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Styl con brazo, 4 patas, respaldo Bajo"},{"cod":"SV2NS.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":11,"name":"Styl sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Styl sin brazo, 4 patas, respaldo Bajo"},{"cod":"PE2OM.01","producto":{"cod":"PE","name":"Perchero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"OM","name":"OMP"},"modelo":{"cod":1,"name":"OMP"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"Gris","respaldocolor":"","estructura":"B6","des":"Perchero modelo OMP"},{"cod":"SO2OM.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"OM","name":"OMP"},"modelo":{"cod":1,"name":"New Alex"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo New Alex, Pivotal, respaldo Alto"},{"cod":"SV2OM.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"OM","name":"OMP"},"modelo":{"cod":1,"name":"Rewind"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B3","des":"Silla Visita modelo Rewind, 4 patas, respaldo Bajo"},{"cod":"SE1SI.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SE1SI.02.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":2,"name":"Bart"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Bart, Syncro, respaldo Medio"},{"cod":"SE1SI.03.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":3,"name":"Rebbel sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Rebbel sin cabecero, Syncro, respaldo Alto"},{"cod":"SE1SI.04.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":4,"name":"Rebbel con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Rebbel con cabecero, Syncro, respaldo Alto"},{"cod":"SE1SI.05.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":5,"name":"Leep"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Leep, Syncro, respaldo Alto"},{"cod":"SO1SI.06.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":6,"name":"Cubo"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Cubo, reclinable, respaldo Bajo"},{"cod":"SO1SI.07.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":7,"name":"Vela"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Vela, reclinable, respaldo Bajo"},{"cod":"SO1SI.08.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":8,"name":"Wok Up"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Wok Up, reclinable, respaldo Medio"},{"cod":"SV1SI.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Strong"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Strong, 4 patas, respaldo Bajo"},{"cod":"BU2ST.01.18.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"SWAN"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF14","respaldocolor":"TF14","estructura":"B2","des":"Butaca modelo SWAN, Giratoria, respaldo Bajo"},{"cod":"BU2ST.02.18.A","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":2,"name":"EGG"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF2","respaldocolor":"TF2","estructura":"B2","des":"Butaca modelo EGG, Giratoria, respaldo Alto"},{"cod":"BU2ST.03.18.A","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":3,"name":"Conica"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF5","respaldocolor":"TF5","estructura":"B3","des":"Butaca modelo Conica, Giratoria, respaldo Alto"},{"cod":"ME2ST.01","producto":{"cod":"ME","name":"Mesa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Noguchi"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"Cristal","respaldocolor":"","estructura":"B3","des":"Mesa modelo Noguchi"},{"cod":"SV2ST.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":2,"name":"Thea"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"P1","estructura":"B3","des":"Silla Visita modelo Thea, 4 patas, respaldo Bajo"},{"cod":"SF2ST.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Barcelona"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Barcelona, 1 cuerpo, respaldo Bajo"},{"cod":"BU1VC.01.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.02.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.03.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.04.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.05.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.06.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.07.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.08.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.09.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.10.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.11.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":11,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.12.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":12,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.13.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":13,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.14.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":14,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.15.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":15,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.16.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":16,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.17.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":17,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.18.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":18,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.19.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":19,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.20.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":20,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.21.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":21,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.22.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":22,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.23.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":23,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.24.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":24,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.25.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":25,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.26.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":26,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.27.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":27,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.28.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":28,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.29.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":29,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.30.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":30,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.31.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":31,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.32.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":32,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.33.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":33,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.34.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":34,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.35.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":35,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.36.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":36,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.37.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":37,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.38.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":38,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.39.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":39,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.40.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":40,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.41.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":41,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.42.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":42,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.43.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":43,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.44.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":44,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.45.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":45,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.46.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":46,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.47.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":47,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.48.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":48,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.49.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":49,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.50.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":50,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.51.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":51,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.52.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":52,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.53.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":53,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.54.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":54,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.55.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":55,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.56.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":56,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.57.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":57,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.58.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":58,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.59.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":59,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.60.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":60,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.61.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":61,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.62.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":62,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.63.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":63,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.64.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":64,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.65.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":65,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.66.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":66,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.67.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":67,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.68.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":68,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.69.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":69,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.70.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":70,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.71.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":71,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.72.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":72,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.73.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":73,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.74.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":74,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.75.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":75,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.76.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":76,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.77.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":77,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.78.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":78,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"PI1VC.01.09.M","producto":{"cod":"PI","name":"Piso Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Redondo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T11","respaldocolor":"","estructura":"B12","des":"Piso Taburete modelo Redondo, 4 patas, respaldo Medio"},{"cod":"SC1VC.01.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby sin brazo, Pivotal, respaldo Medio"},{"cod":"SC1VC.02.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Fijo 680, Pivotal, respaldo Medio"},{"cod":"SC1VC.03.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Regulable PU, Pivotal, respaldo Medio"},{"cod":"SC1VC.04.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby sin brazo, Pivotal, respaldo Alto"},{"cod":"SC1VC.05.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Fijo 680, Pivotal, respaldo Alto"},{"cod":"SC1VC.06.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Regulable PU, Pivotal, respaldo Alto"},{"cod":"SC1VC.07.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"ISO Polipropileno sin brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Cajero modelo ISO Polipropileno sin brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.08.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"ISO Polipropileno con brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Cajero modelo ISO Polipropileno con brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.09.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"ISO Tapizada sin brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo ISO Tapizada sin brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.10.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"ISO Tapizada con brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo ISO Tapizada con brazo, Giratoria, respaldo Medio"},{"cod":"SG1VC.01.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Bastian"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Gerencial modelo Bastian, Reclinable, respaldo Alto"},{"cod":"SO1VC.02.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby sin brazo, Pivotal, respaldo Medio"},{"cod":"SO1VC.03.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Fijo 680, Pivotal, respaldo Medio"},{"cod":"SO1VC.04.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Regulable PU, Pivotal, respaldo Medio"},{"cod":"SO1VC.05.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby sin brazo, Pivotal, respaldo Alto"},{"cod":"SO1VC.06.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Fijo 680, Pivotal, respaldo Alto"},{"cod":"SO1VC.07.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Regulable PU, Pivotal, respaldo Alto"},{"cod":"ST1VC.01.09.M","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Taburete modelo ISO Polipropileno, 4 patas, respaldo Medio"},{"cod":"SV1VC.01.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Polipropileno sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Visita modelo ISO Polipropileno sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.02.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"ISO Polipropileno con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Visita modelo ISO Polipropileno con brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.03.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"ISO Tapizada sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Tapizada sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.04.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"ISO Tapizada con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Tapizada con brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.05.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"ISO Z"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Z, Trineo, respaldo Medio"},{"cod":"SV1VC.06.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"850 con brazo recto"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 850 con brazo recto, 4 patas, respaldo Medio"},{"cod":"SV1VC.07.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"870 sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 870 sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.08.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"870 con brazo curvo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 870 con brazo curvo, 4 patas, respaldo Medio"},{"cod":"SV1VC.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"Spring sin brazos, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1VC.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"Spring sin brazos, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":11,"name":"Spring sin brazos, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.12.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":12,"name":"Spring con brazos, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1VC.13.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":13,"name":"Spring con brazos, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.14.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":14,"name":"Spring con brazos, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.15.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":15,"name":"Alice, sin brazo Tapizada "},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo Tapizada , 4 patas, respaldo Bajo"},{"cod":"SV1VC.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":16,"name":"Alice, con brazo Tapizada "},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo Tapizada , 4 patas, respaldo Bajo"},{"cod":"SV1VC.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":17,"name":"Alice, sin brazo, asiento Tapiz y reapaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo, asiento Tapiz y reapaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.18.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":18,"name":"Alice, con brazo, asiento Tapiz y reapaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo, asiento Tapiz y reapaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":19,"name":"Alice, sin brazo, Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo, Polipropileno, 4 patas, respaldo Bajo"},{"cod":"SV1VC.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":20,"name":"Alice, con brazo, Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo, Polipropileno, 4 patas, respaldo Bajo"}
            ]


let sillasRotas = [
                    {"cod":"BR1CR.01.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"BRC 20"},"mecanismo":{"cod":8,"name":"fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 20, fijo"},{"cod":"BR1CR.02.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"BRC 24"},"mecanismo":{"cod":8,"name":"fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 24, fijo"},{"cod":"BR1CR.03.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"BRC 25"},"mecanismo":{"cod":8,"name":"fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 25, fijo"},{"cod":"BR1CR.04.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"BRC 26"},"mecanismo":{"cod":8,"name":"fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 26, fijo"},{"cod":"BR1CR.05.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"BRC 19"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 19, Regulable"},{"cod":"BR1CR.06.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"BRC 22"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 22, Regulable"},{"cod":"BR1CT.01.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Gamma Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Gamma Negro, Fijo"},{"cod":"BR1CT.02.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Gol Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Gol Negro, Fijo"},{"cod":"BR1CT.03.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Golf Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Golf Negro, Fijo"},{"cod":"BR1CT.04.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Polo Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Polo Negro, Fijo"},{"cod":"BR1CT.05.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Fritz Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Fritz Negro, Regulable"},{"cod":"BR1CT.06.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Mambo Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Mambo Negro, Regulable"},{"cod":"BR1CT.07.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"New Brick Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo New Brick Negro, Regulable"},{"cod":"BR1CT.08.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Vento Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Vento Negro, Regulable"},{"cod":"BR1CT.09.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Rock Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Rock Negro, Regulable"},{"cod":"BR1CT.10.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Isosceles Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Isosceles Negro, Fijo"},{"cod":"BR1CT.11.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Q9 Rap Blanco"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Rap Blanco, Fijo"},{"cod":"BR1CT.12.14","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Q9 Dance Aluminio"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Dance Aluminio, Reclinable"},{"cod":"BR1CT.13.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Q9 Dance Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Dance Negro, Fijo"},{"cod":"AC1CT.01","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Patin Nylon"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Accesorio Patin Nylon"},{"cod":"RU1CT.01","producto":{"cod":"RU","name":"Rueda"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Nylon 50mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Nylon 50mm"},{"cod":"RU1CT.02","producto":{"cod":"RU","name":"Rueda"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Desmopan 50mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Desmopan 50mm"},{"cod":"RU1CT.03","producto":{"cod":"RU","name":"Rueda"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Nylon 65mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Nylon 65mm"},{"cod":"RU1CT.04","producto":{"cod":"RU","name":"Rueda"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Desmopan 65mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Desmopan 65mm"},{"cod":"CA1CT.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Join"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero modelo Join"},{"cod":"CA2KE.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Identity Negro"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero modelo Identity Negro"},{"cod":"BR1SI.01.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Oval Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Oval Negro, Regulable"},{"cod":"CA1SI.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Identity Negro"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero modelo Identity Negro"},{"cod":"BR1VC.01.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo ISO Negro, Fijo"},{"cod":"BR1VC.02.17","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"ISO Negro"},"mecanismo":{"cod":17,"name":"Abatible"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo ISO Negro, Abatible"},{"cod":"PA1VC.01","producto":{"cod":"PA","name":"Paleta"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Plastica"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Paleta modelo ISO Plastica"},{"cod":"RE1VC.01","producto":{"cod":"RE","name":"Rejilla"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Pintada"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rejilla modelo ISO Pintada"}
                  ]

let sillasEstructura = [
                        {"cod":"BA2NS.01.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Dona"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Dona, pedestal"},{"cod":"BA2NS.02.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Lena plato cromado"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Lena plato cromado, pedestal"},{"cod":"BA2NS.03.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Lena plato negro"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Lena plato negro, pedestal"},{"cod":"BA2NS.04.13","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Rico"},"mecanismo":{"cod":13,"name":"plegable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Rico, plegable"},{"cod":"BA2NS.05.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"SKY"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo SKY, pedestal"},{"cod":"BA2NS.06.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"Bistro"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Bistro, pedestal"},{"cod":"BA2NS.07.09","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":7,"name":"Sonia"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Sonia, 4 patas"},{"cod":"BA2NS.08.09","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":8,"name":"Tracy"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Tracy, 4 patas"},{"cod":"BA2NS.09.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":9,"name":"Wicktor 110"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Wicktor 110, pedestal"},{"cod":"BA2NS.10.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":10,"name":"Wicktor 73"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Wicktor 73, pedestal"}
                        ]


/////////////////


let listaSillas = []


_.forEach( sillasEstructura, (value, key) => {
  

              if (!listacolores[value.estructura]) {
                console.log( value.estructura, value.cod )
              }else{
                    _.forEach( listacolores[value.estructura], (valueClE, keyClE) => {
                        listaSillas.push( { 
                                            cod: value.cod, 
                                            pais: value.pais.cod, 
                                            proveedor: value.proveedor.cod, 
                                            modelo: value.modelo.cod, 
                                            mecanismo: value.mecanismo.cod, 
                                            respaldo: value.respaldo.cod, 
                                            des: value.des, 
                                            cat: 21,
                                            asiento: value.asiento,
                                            respaldocolor: value.respaldocolor,
                                            respaldo: value.respaldo.cod,
                                            estructura: value.estructura,
                                            hijos: [ { 
                                                      cod: `${value.cod}.0.0.${value.estructura},${keyClE}`, 
                                                      des: `${value.des}, estructura ${valueClE}`,
                                                      cat: 21,
                                                      asiento: 0,
                                                      respaldocolor: 0,
                                                      estructura: `${value.estructura},${keyClE}`
                                                    } ] 
                                          } )
                    })

              }


})




_.forEach( sillasRotas, (value, key) => {
  listaSillas.push( { cod: value.cod, 
                      pais: value.pais.cod, 
                      proveedor: value.proveedor.cod, 
                      modelo: value.modelo.cod, 
                      mecanismo: value.mecanismo.cod, 
                      respaldo: value.respaldo.cod,
                      des: value.des, 
                      cat: 21,
                      asiento: value.asiento,
                      respaldocolor: value.respaldocolor,
                      respaldo: value.respaldo.cod,
                      estructura: value.estructura,
                      hijos: [ { 
                                cod: `${value.cod}.0.0.0`, 
                                des: value.des,
                                cat: 21,
                                asiento: 0,
                                respaldocolor: 0,
                                estructura: 0
                              } ] 
                    } )
})




        _.forEach( sillas, (value, key) => {    
            let listaHijos = []
            let clAsiento = []
            let clRespaldo = []
            let clEstructura = []
            if (Array.isArray(value.asiento)) {
              _.forEach( value.asiento, (valueAsiento, keyAsiento) => {
                //_.findIndex(listacolores, function(o) { return o.user == valueAsiento  })   
                _.forEach( listacolores[valueAsiento], (valueClA, keyClA) => {
                    clAsiento.push( { cod: valueAsiento,name: valueClA} )
                })
                  if (!listacolores[valueAsiento]) {
                    console.log( valueAsiento, value.cod ) 
                  }
              })
            } else {

                _.forEach( listacolores[value.asiento], (valueClA, keyClA) => {
                    clAsiento.push( { cod: value.asiento,name: valueClA} )
                })
              if (!listacolores[value.asiento]) {
                console.log( value.asiento, value.cod )
              }
            }
            if (Array.isArray(value.respaldocolor)) {
              _.forEach( value.respaldocolor, (valueRes, keyRes) => {
                //_.findIndex(listacolores, function(o) { return o.user == valueAsiento  })   
                  if (!listacolores[valueRes]) {
                    //console.log( valueRes, value.cod ) 
                  }else{
                    _.forEach( listacolores[valueRes], (valueClR, keyClR) => {
                        clRespaldo.push( { cod: valueRes,name: valueClR} )
                    })
                  }
              })
            } else {
              if (!listacolores[value.respaldocolor]) {
                //console.log( value.respaldocolor, value.cod )
              }else{

                    _.forEach( listacolores[value.respaldocolor], (valueClR, keyClR) => {
                        clRespaldo.push( { cod: value.respaldocolor,name: valueClR} )
                    })
              }
            }
              if (!listacolores[value.estructura]) {
                console.log( value.estructura, value.cod )
              }else{
                    _.forEach( listacolores[value.estructura], (valueClE, keyClE) => {
                        clEstructura.push( { cod: value.estructura,name: valueClE} )
                    })
              }
                _.forEach( clAsiento, (va, ka) => {
                  if ( clRespaldo.length == 0) {
                    _.forEach( clEstructura, (ve, ke) => {
                      listaHijos.push( 
                                      { 
                                          cod: `${value.cod}.${va.cod},${ka}.0.${ve.cod},${ke}`, 
                                          des: `${value.des}, asiento ${va.name}, estructura ${ve.name}`,
                                          cat: 20,
                                          asiento: `${va.cod},${ka}`,
                                          respaldocolor: 0,
                                          estructura: `${ve.cod},${ke}`
                                        } 
                                    )
                    })
                  }else{
                    _.forEach( clRespaldo, (vr, kr) => {
                      _.forEach( clEstructura, (ve, ke) => {
                        listaHijos.push( 
                                        { 
                                            cod: `${value.cod}.${va.cod},${ka}.${vr.cod},${kr}.${ve.cod},${ke}`, 
                                            des: `${value.des}, asiento ${va.name}, respaldo ${vr.name}, estructura ${ve.name}`,
                                            cat: 20,
                                            asiento: `${va.cod},${ka}`,
                                            respaldocolor: `${vr.cod},${kr}`,
                                            estructura: `${ve.cod},${ke}`
                                          } 
                                      )
                      })
                    })
                  }
                })
            listaSillas.push( { cod: value.cod,
                                pais: value.pais.cod, 
                                proveedor: value.proveedor.cod, 
                                modelo: value.modelo.cod, 
                                mecanismo: value.mecanismo.cod, 
                                respaldo: value.respaldo.cod,
                                des: value.des,
                                cat: 20,
                                asiento: value.asiento,
                                respaldocolor: value.respaldocolor,
                                estructura: value.estructura,
                                hijos: listaHijos } )
        })




          socket.emit('sillas', listaSillas, (respuesta) => { 

            console.log( respuesta )

          }) 

        //console.log( listaSillas )

  },




  getProyectos: function(method, event) {

//console.log( moment.months() )

    _.forEach(moment.months(), (value, key) => {
      this.obj.calendario[key] = value
    })



    this.obj.showProyecto = this.showProyecto
    this.obj.showRocha = this.showRocha
    this.obj.showServicio = this.showServicio
    this.obj.showSubServicio = this.showSubServicio
    this.obj.buscar = this.buscar

    this.obj.sillas = this.sillas


let form = null

if (event) {

    form = {
                  rocha: event.elements[0].value,
                  proyecto: event.elements[1].value,
                  mas: event.elements[2].value,
                  menos: event.elements[3].value,
                  ejecutivo: event.elements[4].value,
                  cliente: event.elements[5].value,
                }

}

  this.obj.proyectos= []

    socket.emit(method, form, ( y ) => {

          let i = 0
          let ok = 0

          _.forEach(y.form, (value, key) => {
            this.obj.form.ejecutivo[key] = { ejecutivo: `${value.NOMBRES} ${value.APELLIDO_PATERNO} ${value.APELLIDO_MATERNO}`  }
          })

          _.forEach(y.cs, (vcs, kcs) => {
            this.listaCss[kcs] = {  estado: null, csnombre: vcs.csnombre, cs: vcs.cs, cp: vcs.cp, inicio: vcs.inicio.substring(0,10), entrega: vcs.entrega.substring(0,10), css: [], show: false }
            

            i = 0
            ok = 0
            _.forEach(y.css, (vcss, kcss) => {
              if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {
                this.listaCss[kcs].css.push( {  estado: vcss.SUB_ESTADO, css: vcss.CODIGO_SUBSERVICIO, cs: vcss.SUB_CODIGO_SERVICIO, inicio: vcss.SUB_FECHA_INICIO.substring(0,10), entrega: vcss.SUB_FECHA_ENTREGA.substring(0,10)  } )


                  if (vcss.SUB_ESTADO == 'OK') {
                    ok++
                  }

                  i++              


              }
            })

            this.listaCss[kcs].estado = ~~( ( ok * 100 ) / i )


          })

          let min = []
          let max = []
          let mintime = null
          let maxtime = null

          _.forEach(y.np, (vnp, knp) => {
            this.obj.proyectos[knp] = { np: vnp, cp: [], show: false, ingreso: null, entrega: null, estado: null } 
                     
            min[0] = []
            max[0] = []
            i = 0
            ok = 0
            mintime = null
            maxtime = null

            _.forEach(y.cp, (vcp, kcp) => {
              if (vcp.np == vnp) {
                this.obj.proyectos[knp].cp.push({
                                                    np: vcp.np, 
                                                    cp: vcp.cp, 
                                                    cs: [], 
                                                    show: false,
                                                    ingreso: vcp.ingreso.substring(0,10),
                                                    entrega: vcp.entrega.substring(0,10),
                                                    estado: null
                                                })

                if (vcp.estado == 'OK') {
                  ok++
                }

                min[0][i] =  moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD')
                max[0][i] =  moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD')

                i++
              }
            })// cp

                //console.log( ok, i )
                //console.log( ~~( ( ok * 100 ) / i ) )

                mintime = moment.min(min[0])
                maxtime = moment.max(max[0])


            this.obj.proyectos[knp].estado = ~~( ( ok * 100 ) / i )
            this.obj.proyectos[knp].ingreso = mintime.format('YYYY-MM-DD')
            this.obj.proyectos[knp].entrega = maxtime.format('YYYY-MM-DD')

          })// np 
          _.forEach(this.obj.proyectos, (vnp, knp) => {
            _.forEach(this.obj.proyectos[knp].cp, (vcp, kcp) => {



              ok = 0
              i = 0
              _.forEach(this.listaCss, (vcs, kcs) => {
                if (vcp.cp == vcs.cp) {
                  this.obj.proyectos[knp].cp[kcp].cs.push( vcs )

                  if (vcs.estado == 'OK') {
                    ok++
                  }

                  i++
                }
              })// cs

              
              this.obj.proyectos[knp].cp[kcp].estado = ~~( ( ok * 100 ) / i )


            })// cp
          })// np 
                this.trigger( this.obj )
        })

  }

})

export default CuadroRochaStore