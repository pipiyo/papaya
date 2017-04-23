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
          SV: "Silla Visita",
          SR: "Servicios"
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
          VC: "VC Industrial",
          S$S: "Sillas&Sillas"
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

let tt = {
      'Glock': [
                "Azul",
                "Azul Caribe",
                "Azul Lago",
                "Azul Piedra-811",
                "Caoba",
                "Esmeralda",
                "Gris Acero",
                "Gris Perla",
                "Negro",
                "Mango",
                "Manzana",
                "Plomo",
                "Rojo",
                "Verde Pino"
            ],

      'Escorial': [
                "Almendra",
                "Arrecife",
                "Azafran",
                "Azul Caribe",
                "Azul Lago",
                "azul Rey",
                "Blue",
                "Burdeo",
                "Caoba",
                "Esmeralda",
                "Gris Acero",
                "Gris Mouse",
                "Gris Nevado",
                "Gris Perla ",
                "Gris Raton",
                "Mango",
                "Naranja",
                "Navy",
                "Negro",
                "Pera",
                "Rojo",
                "Scarlati",
                "Tabaco",
                "Tilo",
                "Tomate",
                "Verde",
                "Vino"
                ],

      'Maroqui': [""],

      'Venetto': [
                  "Amarillo",
                  "Azul Caribe",
                  "Azul Rey",
                  "Café",
                  "Gris",
                  "Naranjo",
                  "Negro",
                  "Rojo",
                  "Verde",
                  "Verde Pistacho"
                  ],

      'Venezia': [
                  "Azul -821",
                  "Azul Piedra-811",
                  "Bicolor Amarillo -52",
                  "Bicolor Azul Noche-53",
                  "Bicolor Azul-31",
                  "Gris Oscuro-78",
                  "Gris-72"
                  ],

      'Elasticity': [
                  "Azul 21",
                  "Azul 39",
                  "Azul 67",
                  "Gris 14",
                  "Gris 64",
                  "Marron 07",
                  "Naranjo 65",
                  "Negro 60",
                  "Rojo 68",
                  "Verde 66"
                  ],

      'Pegaso': [
                  "Negro 562",
                  "Rojo 582",
                  "Naranjo 558",
                  "Pistacho 569",
                  "Café 552"
                  ],

      'Coventry': [
                  "Negro"
                  ],

      'Renna': [
                  "Amarillo 86",
                  "Azul 957",
                  "Azul Marino 8",
                  "Beige 730",
                  "Blanco Invierno 126",
                  "Burdeo 7",
                  "Celeste Azul 120",
                  "Grafito 620",
                  "Lila 83",
                  "Morado 82",
                  "Negro 9",
                  "Pistacho 71",
                  "Rojo 122",
                  "Rojo Sandia 103"
                  ],

      'Frontier': [
                  "Negro",
                  "Café",
                  "Gris"
                  ],

      'Tacto Plus': [
                  "Burdeo",
                  "Café Moro",
                  "Naranjo",
                  "Negro",
                  "Gris",
                  "Verde Pistacho",
                  "Rojo",
                  "Azul Marino",
                  "Azul Electrico"
                  ],

      'Lana VC': [
                  "Rojo Italiano",
                  "café MORO",
                  "Gris",
                  "Azul Rey",
                  "Azul Marino",
                  "Azul sandia",
                  "Naranja",
                  "Burdeo",
                  "Verde",
                  "Negro",
                  "Café"
                  ],

      'Cuero Natural': [
                  "Blanco",
                  "negro"
                  ],

      'Liberty': [
                  "Negro",
                  "Guinda",
                  "Café",
                  "Blanco",
                  "Amarillo",
                  "Beige",
                  "Mafil",
                  "Gris Acero",
                  "Gris Perla ",
                  "Gris Humo",
                  "Morado",
                  "Verde Pistacho",
                  "Rojo",
                  "Azul",
                  "Celeste",
                  "Azul Blue",
                  "Orange",
                  "Salmon"
                  ],

      'Normandia': [
                  "rojo 26-05",
                  "gris 26-14",
                  "lila 26-06",
                  "café 26-07",
                  "26-04",
                  "26-08",
                  "plus 26-28",
                  "plus 26-29",
                  "plus 26-26",
                  "plus 26-22",
                  "plus 26-40",
                  "plus 26-21",
                  "plus 26-24",
                  "plus 26-39",
                  "plus 26-32-1",
                  "plus 26-25"
                  ],

      'Versalle': [
                  "25-2105",
                  "25-2175",
                  "25-2195",
                  "25-2144",
                  "25-2191",
                  "25-2136"
                  ],

      'Paris': [
                  "15-173",
                  "15-03",
                  "15-21",
                  "15-41",
                  "15-11",
                  "15-04",
                  "15-44",
                  "15-05",
                  "15-10"
                  ]

      }


let listacolores = {

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

}

////DICCIONARIOS

let disccionariosColores = {

      T43: [""],
      'PU Negro': [""],

        TF1:  ["Tapiz Fabrica "],
        TF2:  ["Tapiz Fabrica "],
        TF3:  ["Tapiz Fabrica "],
        TF4:  ["Tapiz Fabrica "],
        TF5:  ["Tapiz Fabrica "],
        TF6:  ["Tapiz Fabrica "],
        TF7:  ["Tapiz Fabrica "],
        TF8:  ["Tapiz Fabrica "],
        TF9:  ["Tapiz Fabrica "],
        TF10: ["Tapiz Fabrica "],
        TF11: [
            "Tapiz Fabrica "
            ],
        TF12: [
            "Tapiz Fabrica "
            ],
        TF13: [
            "Tapiz Fabrica "
            ],  
        TF14: [
            "Tapiz Fabrica "
            ],
        


      D: [
        "Cartoons "
      ],





        M1: ["Malla "],
        M2: ["Malla "],
        M3: ["Malla "],
        M4: ["Malla "],
        M5: ["Malla "],
        M6: ["Malla "],
        M7: ["Malla "],
        M8: ["Malla "],
        M9: ["Malla "],
        M10:["Malla "], 
        M11: [
            "Malla "
            ],  
        M12: [
            "Malla "
            ],
        M13: [
            "Malla "
            ],
        M14: [
            "Malla "
            ],
      


        Eco1: ["Ecocuero "],
        Eco2: ["Ecocuero "],
        Eco3: ["Ecocuero "],
        Eco4: ["Ecocuero "],
        Eco5: ["Ecocuero "],
        Eco6: [
            "Ecocuero "
            ],  
        Eco7: [
            "Ecocuero "
            ],    
        Eco8: [
            "Ecocuero "
            ],    
        Eco9: ["Ecocuero "],


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

        P1: ["Polipropileno "],
        P2: ["Polipropileno "],
        P3: ["Polipropileno "],
        P4: ["Polipropileno "],
        P5: ["Polipropileno "],
        P6: ["Polipropileno "],
        P7: ["Polipropileno "],
        P8: ["Polipropileno "],
        P9: ["Polipropileno "],
        P10:  ["Polipropileno "],
        P11:  ["Polipropileno "],
        P12:  ["Polipropileno "],
        P13:  ["Polipropileno "],
        P14:  ["Polipropileno "],
        P15:  ["Polipropileno "],
        P16:  ["Polipropileno "],
        P17:  ["Polipropileno "],
        P18:  ["Polipropileno "],
        P19:  ["Polipropileno "],
        P20:  ["Polipropileno "],
        P21: [
            "Polipropileno "
            ],  
        P22: [
            "Polipropileno "
            ],    
        P23: [
            "Polipropileno "
            ],  
        P24: [
            "Polipropileno "
            ],  
        P25: [
            "Polipropileno "
            ],  
        P26: [
            "Polipropileno "
            ],  
        P27: [
            "Polipropileno "
            ],  
        P28: [
            "Polipropileno "
            ],  
        P29: [
            "Polipropileno "
            ],  
        P30: [
            "Polipropileno "
            ],  
        P31: [
            "Polipropileno "
            ],  
        P32: [
            "Polipropileno "
            ],  
        P33: [
            "Polipropileno "
            ],    
        P34: [
            "Polipropileno "
            ],  
        P35: [
            "Polipropileno "
            ],  
        P36: [
            "Polipropileno "
            ],    
        P37: [
            "Polipropileno "
            ],  
        P38: [
            "Polipropileno "
            ],  
        P39: [
            "Polipropileno "
            ],  
        P40: [
            "Polipropileno "
            ],  
        P41: [
            "Polipropileno "
            ],  
        P42: [
            "Polipropileno "
            ],  
        P43: [
            "Polipropileno "
            ],    
        P44: [
            "Polipropileno "
            ],  
        P45: [
            "Polipropileno "
            ],

      B1: ["Base "],
      B2: ["Base "],
      B3: ["Base "],
      B4: ["Base "],
      B5: ["Base "],
      B6: ["Base "],
      B7: ["Base "],
      B8: ["Base "],
      B9: ["Base "],
      B10: ["Base "],
      B11: ["Base "],
      B12: [
          "Base "   
          ],  
      B13: [
          "Base " 
          ],    
      B14: [
          "Base "
          ],    
      B15: [
          "Base "
          ],      
      B16: [
          "Base "
          ],  
      B17: [
          "Base "
          ],  
      B18: [
          "Base "
          ],  
      B19: [
          "Base "
          ],

}

let tapizDiccionario = [
                        "T1",
                        "T2",
                        "T3",
                        "T4",
                        "T5",
                        "T6",
                        "T7",
                        "T8",
                        "T9",
                        "T10",
                        "T11",
                        "T12",
                        "T13",
                        "T14",
                        "T15",
                        "T16",
                        "T17",
                        "T18",
                        "T19",
                        "T20",
                        "T21",
                        "T22",
                        "T23",
                        "T24"
                        ]

//console.log( tapizDiccionario.includes('T24') )

///////////////SILLAS


//Elaticity Elasticity
//Escorila Escorial
//Marroqui Maroqui



let telas = [
              {"cod":"TE1CR.01","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Coventry"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Coventry"},{"cod":"TE1CR.02","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Elasticity"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Elasticity"},{"cod":"TE1CR.03","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Pegaso"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Pegaso"},{"cod":"TE1CR.04","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Renna"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Renna"},{"cod":"TE1CT.01","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Escorial"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Escorial"},{"cod":"TE1CT.02","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Glock"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Glock"},{"cod":"TE1CT.03","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Maroqui"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Maroqui"},{"cod":"TE1CT.04","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Normandia"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Normandia"},{"cod":"TE1CT.05","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Paris"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Paris"},{"cod":"TE1CT.06","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Venetto"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Venetto"},{"cod":"TE1CT.07","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Venezia"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Venezia"},{"cod":"TE1CT.08","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Versalle"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Versalle"},{"cod":"TE1CU.01","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CU","name":"Cuerotexa"},"modelo":{"cod":1,"name":"Frontier"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Frontier"},{"cod":"TE1LI.01","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Liberty"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Liberty"},{"cod":"TE1VC.01","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Tacto Plus"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Tacto Plus"},{"cod":"TE1VC.02","producto":{"cod":"TE","name":"Tela"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"Lana VC"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tela Lana VC"}
              ]

let servicios = [
                {"cod":"SR1S&S.01","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":1,"name":"Cambio de Ruedas"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["",""],"respaldocolor":["",""],"estructura":"","des":"Servicios Cambio de Ruedas"},{"cod":"SR1S&S.02","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":2,"name":"Embalaje"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["",""],"respaldocolor":["",""],"estructura":"","des":"Servicios Embalaje"},{"cod":"SR1S&S.03","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":3,"name":"Mantencion"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["",""],"respaldocolor":["",""],"estructura":"","des":"Servicios Mantencion"},{"cod":"SR1S&S.04","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":4,"name":"Retapizado de Silla asiento"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["T20","T22"],"respaldocolor":["",""],"estructura":"","des":"Servicios Retapizado de Silla asiento"},{"cod":"SR1S&S.05","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":5,"name":"Retapizado de Silla completo"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["T20","T22"],"respaldocolor":["T20","T22"],"estructura":"","des":"Servicios Retapizado de Silla completo"},{"cod":"SR1S&S.06","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":6,"name":"Retapizado de Sofa"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["",""],"respaldocolor":["",""],"estructura":"","des":"Servicios Retapizado de Sofa"},{"cod":"SR1S&S.07","producto":{"cod":"SR","name":"Servicios"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"S&S","name":"Sillas&Silla"},"modelo":{"cod":7,"name":"Visita Tecnica"},"mecanismo":{"cod":"","name":""},"respaldo":{"cod":"","name":""},"asiento":["",""],"respaldocolor":["",""],"estructura":"","des":"Servicios Visita Tecnica"}
                ]

let sillas0 = [
                {"cod":"SA2BO.01.18.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"BO","name":"Bosen"},"modelo":{"cod":1,"name":"Nodo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P45","respaldocolor":"P45","estructura":"B6","des":"Silla Academica modelo Nodo, Giratoria, respaldo Bajo"},{"cod":"SV2BO.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"BO","name":"Bosen"},"modelo":{"cod":1,"name":"Bella"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Visita modelo Bella, 4 patas, respaldo Bajo"},{"cod":"SE1CR.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Leep"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Leep, Syncro, respaldo Alto"},{"cod":"SE1CR.05.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Skate"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"M1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Skate, Syncro, respaldo Medio"},{"cod":"SG1CR.01.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Ben"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Gerencial modelo Ben, Reclinable, respaldo Alto"},{"cod":"SG1CR.02.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Morfeo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Gerencial modelo Morfeo, Reclinable, respaldo Alto"},{"cod":"SO1CR.41.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":41,"name":"Syriana"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Syriana, Syncro, respaldo Medio"},{"cod":"SV1CR.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Break"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P27","respaldocolor":"P27","estructura":"B3","des":"Silla Visita modelo Break, 4 patas, respaldo Bajo"},{"cod":"SV1CR.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Dream con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P24","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":8,"name":"Dream sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P24","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.12.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":12,"name":"Iso Revolution con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P25","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":16,"name":"Iso Revolution sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P25","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":20,"name":"Kyos con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P23","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.24.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":24,"name":"Kyos sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P23","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.26.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":26,"name":"Shell"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P21","respaldocolor":"P21","estructura":"B3","des":"Silla Visita modelo Shell, 4 patas, respaldo Bajo"},{"cod":"SV1CR.27.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":27,"name":"Strike"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P22","respaldocolor":"P22","estructura":"B3","des":"Silla Visita modelo Strike, 4 patas, respaldo Bajo"},{"cod":"BU1CT.01.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.02.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.03.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Butterfly asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.04.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.05.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.06.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Butterfly asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.07.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.08.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.09.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Butterfly asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento tapiz y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.10.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.11.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.12.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Butterfly asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.13.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.14.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.15.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Butterfly asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.16.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.17.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.18.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Butterfly asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.19.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.20.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.21.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Butterfly asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.22.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.23.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.24.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Butterfly asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.25.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.26.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.27.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Butterfly asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Butterfly asiento y respaldo Tapiz, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.28.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.29.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.30.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Isonet asiento tapiz y respaldo Malla, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.31.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.32.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":32,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.33.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":33,"name":"Isonet asiento tapiz y respaldo Malla, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.34.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":34,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.35.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":35,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.36.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":36,"name":"Isonet asiento tapiz y respaldo Malla, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Isonet asiento tapiz y respaldo Malla, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.37.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":37,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.38.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":38,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.39.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":39,"name":"Isosceles asiento y respaldo Tapiz, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B3","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.40.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":40,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.41.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":41,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.42.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":42,"name":"Isosceles asiento y respaldo Tapiz, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.43.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":43,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.44.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":44,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.45.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":45,"name":"Isosceles asiento y respaldo Tapiz, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Butaca modelo Isosceles asiento y respaldo Tapiz, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.46.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":46,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.47.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":47,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.48.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":48,"name":"Layer asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B3","des":"Butaca modelo Layer asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.49.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":49,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.50.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":50,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.51.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":51,"name":"Layer asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B1","des":"Butaca modelo Layer asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.52.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":52,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.53.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":53,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.54.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":54,"name":"Layer asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B2","des":"Butaca modelo Layer asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.55.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":55,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.56.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":56,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.57.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":57,"name":"Novaiso asiento y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.58.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":58,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.59.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":59,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.60.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":60,"name":"Novaiso asiento y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.61.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":61,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.62.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":62,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.63.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":63,"name":"Novaiso asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Novaiso asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.64.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":64,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.65.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":65,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.66.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":66,"name":"Prisma asiento tapiz y respaldo PP, pata Flex"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B3","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Flex, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.67.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":67,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.68.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":68,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.69.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":69,"name":"Prisma asiento tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.70.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":70,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.71.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":71,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.72.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":72,"name":"Prisma asiento tapiz y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T21","respaldocolor":"P1","estructura":"B2","des":"Butaca modelo Prisma asiento tapiz y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"BU1CT.73.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":73,"name":"Race asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Race asiento y respaldo PP, pata Splash, 2 cuerpo, respaldo Bajo"},{"cod":"BU1CT.74.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":74,"name":"Race asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Race asiento y respaldo PP, pata Splash, 3 cuerpo, respaldo Bajo"},{"cod":"BU1CT.75.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":75,"name":"Race asiento y respaldo PP, pata Splash"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Butaca modelo Race asiento y respaldo PP, pata Splash, 4 cuerpo, respaldo Bajo"},{"cod":"PO1CT.01.01.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Dali"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Dali, 1 cuerpo, respaldo Bajo"},{"cod":"PO1CT.02.01.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Goya"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Goya, 1 cuerpo, respaldo Bajo"},{"cod":"PO1CT.03.01.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Miro"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Miro, 1 cuerpo, respaldo Bajo"},{"cod":"PO1CT.04.01.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Monnet"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Monnet, 1 cuerpo, respaldo Bajo"},{"cod":"PO1CT.05.07.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Monnet Trineo"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Monnet Trineo, Trineo, respaldo Bajo"},{"cod":"PO1CT.06.01.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Picasso"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"T18","estructura":"B2","des":"Poltrona modelo Picasso, 1 cuerpo, respaldo Bajo"},{"cod":"SC1CT.01.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Isosceles aro cromado"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Isosceles aro cromado, Giratoria, respaldo Medio"},{"cod":"SC1CT.02.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Isosceles aro Nylon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Isosceles aro Nylon, Giratoria, respaldo Medio"},{"cod":"SC1CT.03.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"NovaIso aro cromado"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo NovaIso aro cromado, Giratoria, respaldo Medio"},{"cod":"SC1CT.04.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"NovaIso aro nylon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P1","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo NovaIso aro nylon, Giratoria, respaldo Medio"},{"cod":"SC1CT.05.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Prisma aro Cromado"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo Prisma aro Cromado, Pivotal, respaldo Medio"},{"cod":"SC1CT.06.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Prisma aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"P1","estructura":"B1","des":"Silla Cajero modelo Prisma aro Nylon, Pivotal, respaldo Medio"},{"cod":"SC1CT.07.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Rudy aro Nylon, con brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, con brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SC1CT.08.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Rudy aro Nylon, con brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, con brazo Gol, Pivotal, respaldo Medio"},{"cod":"SC1CT.09.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Rudy aro Nylon, con brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, con brazo Golf, Pivotal, respaldo Medio"},{"cod":"SC1CT.10.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Rudy aro Nylon, con brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, con brazo Polo, Pivotal, respaldo Medio"},{"cod":"SC1CT.11.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Rudy aro Nylon, con brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, con brazo Vento, Pivotal, respaldo Medio"},{"cod":"SC1CT.12.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Rudy aro Nylon, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Rudy aro Nylon, sin brazos, Pivotal, respaldo Medio"},{"cod":"SC1CT.13.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Speed aro Cromado, con brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, con brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SC1CT.14.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Speed aro Cromado, con brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, con brazo Gol, Pivotal, respaldo Medio"},{"cod":"SC1CT.15.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Speed aro Cromado, con brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, con brazo Golf, Pivotal, respaldo Medio"},{"cod":"SC1CT.16.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Speed aro Cromado, con brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, con brazo Polo, Pivotal, respaldo Medio"},{"cod":"SC1CT.17.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Speed aro Cromado, con brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, con brazo Vento, Pivotal, respaldo Medio"},{"cod":"SC1CT.18.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Speed aro Cromado, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Cromado, sin brazos, Pivotal, respaldo Medio"},{"cod":"SC1CT.19.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Speed aro Nylon, con brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, con brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SC1CT.20.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Speed aro Nylon, con brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, con brazo Gol, Pivotal, respaldo Medio"},{"cod":"SC1CT.21.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Speed aro Nylon, con brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, con brazo Golf, Pivotal, respaldo Medio"},{"cod":"SC1CT.22.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Speed aro Nylon, con brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, con brazo Polo, Pivotal, respaldo Medio"},{"cod":"SC1CT.23.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Speed aro Nylon, con brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, con brazo Vento, Pivotal, respaldo Medio"},{"cod":"SC1CT.24.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Speed aro Nylon, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Speed aro Nylon, sin brazos, Pivotal, respaldo Medio"},{"cod":"SC1CT.25.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Torino aro Nylon, con brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, con brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SC1CT.26.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Torino aro Nylon, con brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, con brazo Gol, Pivotal, respaldo Medio"},{"cod":"SC1CT.27.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Torino aro Nylon, con brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, con brazo Golf, Pivotal, respaldo Medio"},{"cod":"SC1CT.28.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Torino aro Nylon, con brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, con brazo Polo, Pivotal, respaldo Medio"},{"cod":"SC1CT.29.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Torino aro Nylon, con brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, con brazo Vento, Pivotal, respaldo Medio"},{"cod":"SC1CT.30.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Torino aro Nylon, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Cajero modelo Torino aro Nylon, sin brazos, Pivotal, respaldo Medio"},{"cod":"SC1CT.31.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Tulip aro Nylon"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"PU Negro","respaldocolor":"PU Negro","estructura":"B1","des":"Silla Cajero modelo Tulip aro Nylon, Pivotal, respaldo Medio"},{"cod":"SE1CT.01.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Atton"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco6","respaldocolor":"Eco6","estructura":"B3","des":"Silla Ejecutiva modelo Atton, Reclinable, respaldo Medio"},{"cod":"SE1CT.02.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Atton"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Atton, Reclinable, respaldo Alto"},{"cod":"SE1CT.03.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Beauty"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Beauty, Syncro, respaldo Medio"},{"cod":"SE1CT.04.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Belgica"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Belgica, Reclinable, respaldo Medio"},{"cod":"SE1CT.05.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Black"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Black, Syncro, respaldo Alto"},{"cod":"SE1CT.06.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Cinque"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Ejecutiva modelo Cinque, Syncro, respaldo Medio"},{"cod":"SE1CT.07.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Cinque"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Ejecutiva modelo Cinque, Syncro, respaldo Alto"},{"cod":"SE1CT.08.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Daniela"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Daniela, Reclinable, respaldo Medio"},{"cod":"SE1CT.09.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Daniela"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Daniela, Reclinable, respaldo Alto"},{"cod":"SE1CT.10.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Director"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Director, Reclinable, respaldo Alto"},{"cod":"SE1CT.11.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"E-chair"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B18","des":"Silla Ejecutiva modelo E-chair, Syncro, respaldo Alto"},{"cod":"SE1CT.12.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"E-chair"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B18","des":"Silla Ejecutiva modelo E-chair, Syncro, respaldo Alto"},{"cod":"SE1CT.13.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Elegance"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Elegance, Reclinable, respaldo Alto"},{"cod":"SE1CT.14.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Ergohuman Malla"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"M1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Malla, Syncro, respaldo Alto"},{"cod":"SE1CT.15.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Ergohuman Malla con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"M1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Malla con cabecero, Syncro, respaldo Alto"},{"cod":"SE1CT.16.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Ergohuman Tapizada"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Tapizada, Syncro, respaldo Alto"},{"cod":"SE1CT.17.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Ergohuman Tapizada sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Ejecutiva modelo Ergohuman Tapizada sin cabecero, Syncro, respaldo Alto"},{"cod":"SE1CT.18.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Fast"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Fast, Reclinable, respaldo Alto"},{"cod":"SE1CT.19.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SE1CT.20.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Join brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Join brazo Fritz, Syncro, respaldo Alto"},{"cod":"SE1CT.21.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Join brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Join brazo Golf, Syncro, respaldo Alto"},{"cod":"SE1CT.22.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Join brazo Mambo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Join brazo Mambo, Syncro, respaldo Alto"},{"cod":"SE1CT.23.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Join brazo Rock"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Join brazo Rock, Syncro, respaldo Alto"},{"cod":"SE1CT.24.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Join brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Join brazo Vento, Syncro, respaldo Alto"},{"cod":"SE1CT.25.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Logic"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Logic, Reclinable, respaldo Medio"},{"cod":"SE1CT.26.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Loop"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Loop, Syncro, respaldo Alto"},{"cod":"SE1CT.27.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Manager"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Manager, Reclinable, respaldo Alto"},{"cod":"SE1CT.28.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Mango"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Mango, Reclinable, respaldo Alto"},{"cod":"SE1CT.29.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Master"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Master, Reclinable, respaldo Alto"},{"cod":"SE1CT.30.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Rebbel con cabecero, con brazo 3D"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo 3D, Syncro, respaldo Alto"},{"cod":"SE1CT.31.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Rebbel con cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo regulable, Syncro, respaldo Alto"},{"cod":"SE1CT.32.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":32,"name":"Rebbel con cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel con cabecero, con brazo regulable, Syncro, respaldo Medio"},{"cod":"SE1CT.33.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":33,"name":"Rebbel sin cabecero, con brazo 3D"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"M1","estructura":"B2","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo 3D, Syncro, respaldo Alto"},{"cod":"SE1CT.34.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":34,"name":"Rebbel sin cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo regulable, Syncro, respaldo Alto"},{"cod":"SE1CT.35.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":35,"name":"Rebbel sin cabecero, con brazo regulable"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Rebbel sin cabecero, con brazo regulable, Syncro, respaldo Medio"},{"cod":"SE1CT.36.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":36,"name":"Tuono"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Tuono, Reclinable, respaldo Alto"},{"cod":"SE1CT.37.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":37,"name":"Tuono"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Ejecutiva modelo Tuono, Reclinable, respaldo Alto"},{"cod":"SG1CT.01.16.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Vapor con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Gerencial modelo Vapor con cabecero, Syncro, respaldo Alto"},{"cod":"SG1CT.02.16.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Vapor sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B3","des":"Silla Gerencial modelo Vapor sin cabecero, Syncro, respaldo Alto"},{"cod":"SO1CT.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Alex, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Fritz, Pivotal, respaldo Alto"},{"cod":"SO1CT.02.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Alex, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SO1CT.03.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Alex, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Gol, Pivotal, respaldo Alto"},{"cod":"SO1CT.04.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Alex, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Gol, Pivotal, respaldo Medio"},{"cod":"SO1CT.05.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Alex, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Golf, Pivotal, respaldo Alto"},{"cod":"SO1CT.06.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Alex, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Golf, Pivotal, respaldo Medio"},{"cod":"SO1CT.07.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Alex, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Polo, Pivotal, respaldo Alto"},{"cod":"SO1CT.08.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Alex, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Polo, Pivotal, respaldo Medio"},{"cod":"SO1CT.09.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Alex, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Vento, Pivotal, respaldo Alto"},{"cod":"SO1CT.10.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Alex, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, brazo Vento, Pivotal, respaldo Medio"},{"cod":"SO1CT.11.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Alex, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, sin brazos, Pivotal, respaldo Alto"},{"cod":"SO1CT.12.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Alex, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Alex, sin brazos, Pivotal, respaldo Medio"},{"cod":"SO1CT.13.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Aviator, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SO1CT.14.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Aviator, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Fritz, Pivotal, respaldo Alto"},{"cod":"SO1CT.15.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Aviator, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Fritz, Syncro, respaldo Medio"},{"cod":"SO1CT.16.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Aviator, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Fritz, Syncro, respaldo Alto"},{"cod":"SO1CT.17.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Aviator, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Gol, Pivotal, respaldo Medio"},{"cod":"SO1CT.18.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Aviator, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Gol, Pivotal, respaldo Alto"},{"cod":"SO1CT.19.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Aviator, brazo Gol"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Gol, Syncro, respaldo Medio"},{"cod":"SO1CT.20.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Aviator, brazo Gol"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Gol, Syncro, respaldo Alto"},{"cod":"SO1CT.21.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Aviator, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Golf, Pivotal, respaldo Medio"},{"cod":"SO1CT.22.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Aviator, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Golf, Pivotal, respaldo Alto"},{"cod":"SO1CT.23.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Aviator, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Golf, Syncro, respaldo Medio"},{"cod":"SO1CT.24.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Aviator, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Golf, Syncro, respaldo Alto"},{"cod":"SO1CT.25.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Aviator, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Polo, Pivotal, respaldo Medio"},{"cod":"SO1CT.26.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Aviator, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Polo, Pivotal, respaldo Alto"},{"cod":"SO1CT.27.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Aviator, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Polo, Syncro, respaldo Medio"},{"cod":"SO1CT.28.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Aviator, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Polo, Syncro, respaldo Alto"},{"cod":"SO1CT.29.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Aviator, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Vento, Pivotal, respaldo Medio"},{"cod":"SO1CT.30.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Aviator, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Vento, Pivotal, respaldo Alto"},{"cod":"SO1CT.31.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":31,"name":"Aviator, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Vento, Syncro, respaldo Medio"},{"cod":"SO1CT.32.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":32,"name":"Aviator, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, brazo Vento, Syncro, respaldo Alto"},{"cod":"SO1CT.33.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":33,"name":"Aviator, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, sin brazos, Pivotal, respaldo Medio"},{"cod":"SO1CT.34.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":34,"name":"Aviator, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, sin brazos, Pivotal, respaldo Alto"},{"cod":"SO1CT.35.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":35,"name":"Aviator, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, sin brazos, Syncro, respaldo Medio"},{"cod":"SO1CT.36.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":36,"name":"Aviator, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Aviator, sin brazos, Syncro, respaldo Alto"},{"cod":"SO1CT.37.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":37,"name":"Bend brazo fijo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Bend brazo fijo, Reclinable, respaldo Medio"},{"cod":"SO1CT.38.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":38,"name":"Bend brazo regulable"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Bend brazo regulable, Reclinable, respaldo Medio"},{"cod":"SO1CT.39.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":39,"name":"Biro, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Fritz, Syncro, respaldo Alto"},{"cod":"SO1CT.40.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":40,"name":"Biro, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Fritz, Pivotal, respaldo Alto"},{"cod":"SO1CT.41.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":41,"name":"Biro, brazo Gol"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Gol, Syncro, respaldo Alto"},{"cod":"SO1CT.42.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":42,"name":"Biro, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Gol, Pivotal, respaldo Alto"},{"cod":"SO1CT.43.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":43,"name":"Biro, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Golf, Syncro, respaldo Alto"},{"cod":"SO1CT.44.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":44,"name":"Biro, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Golf, Pivotal, respaldo Alto"},{"cod":"SO1CT.45.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":45,"name":"Biro, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Polo, Syncro, respaldo Alto"},{"cod":"SO1CT.46.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":46,"name":"Biro, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Polo, Pivotal, respaldo Alto"},{"cod":"SO1CT.47.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":47,"name":"Biro, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Vento, Syncro, respaldo Alto"},{"cod":"SO1CT.48.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":48,"name":"Biro, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, brazo Vento, Pivotal, respaldo Alto"},{"cod":"SO1CT.49.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":49,"name":"Biro, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, sin brazos, Syncro, respaldo Alto"},{"cod":"SO1CT.50.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":50,"name":"Biro, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Biro, sin brazos, Pivotal, respaldo Alto"},{"cod":"SO1CT.51.18.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":51,"name":"Genova"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Genova, Giratoria, respaldo Medio"},{"cod":"SO1CT.52.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":52,"name":"Genova"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Genova, Reclinable, respaldo Medio"},{"cod":"SO1CT.53.09.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":53,"name":"Lady"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Lady, 4 patas, respaldo Bajo"},{"cod":"SO1CT.54.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":54,"name":"Lady"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Lady, Reclinable, respaldo Bajo"},{"cod":"SO1CT.55.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":55,"name":"Lady estructura blanca"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"M12","estructura":"B4","des":"Silla Operativa modelo Lady estructura blanca, Reclinable, respaldo Bajo"},{"cod":"SO1CT.56.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":56,"name":"Lampo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Lampo, Reclinable, respaldo Medio"},{"cod":"SO1CT.57.18.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":57,"name":"Lampo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Lampo, Giratoria, respaldo Medio"},{"cod":"SO1CT.58.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":58,"name":"New Bend"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo New Bend, Reclinable, respaldo Medio"},{"cod":"SO1CT.59.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":59,"name":"Q3 One, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, brazo Fritz, Syncro, respaldo Alto"},{"cod":"SO1CT.60.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":60,"name":"Q3 One, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, brazo Golf, Syncro, respaldo Alto"},{"cod":"SO1CT.61.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":61,"name":"Q3 One, brazo Mambo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, brazo Mambo, Syncro, respaldo Alto"},{"cod":"SO1CT.62.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":62,"name":"Q3 One, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, brazo Polo, Syncro, respaldo Alto"},{"cod":"SO1CT.63.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":63,"name":"Q3 One, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, brazo Vento, Syncro, respaldo Alto"},{"cod":"SO1CT.64.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":64,"name":"Q3 One, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 One, sin brazos, Syncro, respaldo Alto"},{"cod":"SO1CT.65.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":65,"name":"Q3 Two, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, brazo Fritz, Syncro, respaldo Alto"},{"cod":"SO1CT.66.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":66,"name":"Q3 Two, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, brazo Golf, Syncro, respaldo Alto"},{"cod":"SO1CT.67.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":67,"name":"Q3 Two, brazo Mambo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, brazo Mambo, Syncro, respaldo Alto"},{"cod":"SO1CT.68.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":68,"name":"Q3 Two, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, brazo Polo, Syncro, respaldo Alto"},{"cod":"SO1CT.69.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":69,"name":"Q3 Two, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, brazo Vento, Syncro, respaldo Alto"},{"cod":"SO1CT.70.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":70,"name":"Q3 Two, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q3 Two, sin brazos, Syncro, respaldo Alto"},{"cod":"SO1CT.75.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":75,"name":"Rudy, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, brazo Fritz, Pivotal, respaldo Alto"},{"cod":"SO1CT.76.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":76,"name":"Rudy, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SO1CT.77.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":77,"name":"Rudy, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, brazo Gol, Pivotal, respaldo Alto"},{"cod":"SO1CT.78.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":78,"name":"Rudy, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, brazo Gol, Pivotal, respaldo Medio"},{"cod":"SO1CT.79.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":79,"name":"Rudy, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, brazo Golf, Pivotal, respaldo Alto"},{"cod":"SO1CT.80.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":80,"name":"Rudy, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, brazo Golf, Pivotal, respaldo Medio"},{"cod":"SO1CT.81.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":81,"name":"Rudy, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, brazo Polo, Pivotal, respaldo Alto"},{"cod":"SO1CT.82.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":82,"name":"Rudy, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, brazo Polo, Pivotal, respaldo Medio"},{"cod":"SO1CT.83.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":83,"name":"Rudy, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, brazo Vento, Pivotal, respaldo Alto"},{"cod":"SO1CT.84.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":84,"name":"Rudy, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, brazo Vento, Pivotal, respaldo Medio"},{"cod":"SO1CT.85.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":85,"name":"Rudy, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Rudy, sin brazos, Pivotal, respaldo Alto"},{"cod":"SO1CT.86.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":86,"name":"Rudy, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B2","des":"Silla Operativa modelo Rudy, sin brazos, Pivotal, respaldo Medio"},{"cod":"SO1CT.87.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":87,"name":"Syriana"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Syriana, Reclinable, respaldo Medio"},{"cod":"SO1CT.88.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":88,"name":"Syriana"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B2","des":"Silla Operativa modelo Syriana, Syncro, respaldo Medio"},{"cod":"SO1CT.89.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":89,"name":"Torino, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Fritz, Pivotal, respaldo Medio"},{"cod":"SO1CT.90.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":90,"name":"Torino, brazo Fritz"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Fritz, Pivotal, respaldo Alto"},{"cod":"SO1CT.91.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":91,"name":"Torino, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Fritz, Syncro, respaldo Medio"},{"cod":"SO1CT.92.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":92,"name":"Torino, brazo Fritz"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Fritz, Syncro, respaldo Alto"},{"cod":"SO1CT.93.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":93,"name":"Torino, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Gol, Pivotal, respaldo Medio"},{"cod":"SO1CT.94.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":94,"name":"Torino, brazo Gol"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Gol, Pivotal, respaldo Alto"},{"cod":"SO1CT.95.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":95,"name":"Torino, brazo Gol"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Gol, Syncro, respaldo Medio"},{"cod":"SO1CT.96.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":96,"name":"Torino, brazo Gol"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Gol, Syncro, respaldo Alto"},{"cod":"SO1CT.97.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":97,"name":"Torino, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Golf, Pivotal, respaldo Medio"},{"cod":"SO1CT.98.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":98,"name":"Torino, brazo Golf"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Golf, Pivotal, respaldo Alto"},{"cod":"SO1CT.99.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":99,"name":"Torino, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Golf, Syncro, respaldo Medio"},{"cod":"SO1CT.100.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":100,"name":"Torino, brazo Golf"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Golf, Syncro, respaldo Alto"},{"cod":"SO1CT.101.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":101,"name":"Torino, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Polo, Pivotal, respaldo Medio"},{"cod":"SO1CT.102.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":102,"name":"Torino, brazo Polo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Polo, Pivotal, respaldo Alto"},{"cod":"SO1CT.103.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":103,"name":"Torino, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Polo, Syncro, respaldo Medio"}
                ]



let sillas1 = [
                {"cod":"SO1CT.104.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":104,"name":"Torino, brazo Polo"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Polo, Syncro, respaldo Alto"},{"cod":"SO1CT.105.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":105,"name":"Torino, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Vento, Pivotal, respaldo Medio"},{"cod":"SO1CT.106.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":106,"name":"Torino, brazo Vento"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Vento, Pivotal, respaldo Alto"},{"cod":"SO1CT.107.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":107,"name":"Torino, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Vento, Syncro, respaldo Medio"},{"cod":"SO1CT.108.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":108,"name":"Torino, brazo Vento"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, brazo Vento, Syncro, respaldo Alto"},{"cod":"SO1CT.109.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":109,"name":"Torino, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, sin brazos, Pivotal, respaldo Medio"},{"cod":"SO1CT.110.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":110,"name":"Torino, sin brazos"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, sin brazos, Pivotal, respaldo Alto"},{"cod":"SO1CT.111.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":111,"name":"Torino, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, sin brazos, Syncro, respaldo Medio"},{"cod":"SO1CT.112.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":112,"name":"Torino, sin brazos"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"T21","estructura":"B1","des":"Silla Operativa modelo Torino, sin brazos, Syncro, respaldo Alto"},{"cod":"SO1CT.113.18.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":113,"name":"Tulip"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"PU Negro","respaldocolor":"PU Negro","estructura":"B1","des":"Silla Operativa modelo Tulip, Giratoria, respaldo Bajo"},{"cod":"SO1CT.114.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":114,"name":"Y10"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T21","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Y10, Syncro, respaldo Medio"},{"cod":"SO1CT.115.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":115,"name":"Y10"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T21","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Y10, Syncro, respaldo Alto"},{"cod":"ST1CT.01.09.M","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Paco"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P29","respaldocolor":"P29","estructura":"B3","des":"Silla Taburete modelo Paco, 4 patas, respaldo Medio"},{"cod":"ST1CT.02.07.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Smile"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Silla Taburete modelo Smile, Trineo, respaldo Bajo"},{"cod":"ST1CT.03.07.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Smile"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P8","respaldocolor":"P8","estructura":"B3","des":"Silla Taburete modelo Smile, Trineo, respaldo Bajo"},{"cod":"ST1CT.04.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Sun"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Silla Taburete modelo Sun, Regulable, respaldo Bajo"},{"cod":"ST1CT.05.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Sun"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P8","respaldocolor":"P8","estructura":"B3","des":"Silla Taburete modelo Sun, Regulable, respaldo Bajo"},{"cod":"ST1CT.06.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Sun"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"B3","des":"Silla Taburete modelo Sun, Regulable, respaldo Bajo"},{"cod":"ST1CT.07.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Tom"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"B3","des":"Silla Taburete modelo Tom, 4 patas, respaldo Bajo"},{"cod":"ST1CT.08.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Tom Up & Down"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"B3","des":"Silla Taburete modelo Tom Up & Down, Regulable, respaldo Bajo"},{"cod":"ST1CT.09.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Tom Up & Down"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B3","des":"Silla Taburete modelo Tom Up & Down, Regulable, respaldo Bajo"},{"cod":"ST1CT.10.15.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Tom Up & Down"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P9","respaldocolor":"P9","estructura":"B3","des":"Silla Taburete modelo Tom Up & Down, Regulable, respaldo Bajo"},{"cod":"ST1CT.11.07.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Tribeca"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"B3","des":"Silla Taburete modelo Tribeca, Trineo, respaldo Bajo"},{"cod":"SV1CT.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Butterfly con brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Butterfly sin brazo, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.14.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Layer con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B12","des":"Silla Visita modelo Layer con brazo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.15.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Layer sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P28","respaldocolor":"P28","estructura":"B12","des":"Silla Visita modelo Layer sin brazo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"NovaIso Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P1","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo NovaIso Polipropileno, 4 patas, respaldo Bajo"},{"cod":"SV1CT.25.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":25,"name":"Rebbel"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Visita modelo Rebbel, Trineo, respaldo Medio"},{"cod":"SV1CT.26.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":26,"name":"Rebbel"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Rebbel, Trineo, respaldo Bajo"},{"cod":"SV1CT.27.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":27,"name":"Strong"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T6","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Strong, 4 patas, respaldo Bajo"},{"cod":"SV1CT.30.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":30,"name":"Vigo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M13","estructura":"B6","des":"Silla Visita modelo Vigo, 4 patas, respaldo Bajo"},{"cod":"SF1CT.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Murano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 1 cuerpo, respaldo Bajo"},{"cod":"SF1CT.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Murano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1CT.03.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Murano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Sofa modelo Murano, 3 cuerpo, respaldo Bajo"},{"cod":"SE2DA.01.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Coco"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Ejecutiva modelo Coco, Syncro, respaldo Medio"},{"cod":"SE2DA.02.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":2,"name":"Fun-on"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF11","respaldocolor":"TF11","estructura":"B1","des":"Silla Ejecutiva modelo Fun-on, Syncro, respaldo Alto"},{"cod":"SE2DA.03.16.B","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":3,"name":"Shape"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"TF5","estructura":"B1","des":"Silla Ejecutiva modelo Shape, Syncro, respaldo Bajo"},{"cod":"SE2DA.04.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":4,"name":"Strike"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Strike, Syncro, respaldo Alto"},{"cod":"SE2DA.05.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":5,"name":"Valo Sync"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF12","respaldocolor":"M14","estructura":"B1","des":"Silla Ejecutiva modelo Valo Sync, Syncro, respaldo Medio"},{"cod":"SE2DA.06.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":6,"name":"Valo Sync Tapizada"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF12","respaldocolor":"TF12","estructura":"B1","des":"Silla Ejecutiva modelo Valo Sync Tapizada, Syncro, respaldo Medio"},{"cod":"SE2DA.07.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":7,"name":"Vit-o Confort"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF11","respaldocolor":"TF11","estructura":"B1","des":"Silla Ejecutiva modelo Vit-o Confort, Syncro, respaldo Alto"},{"cod":"SO2DA.01.11.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Vida"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Operativa modelo Vida, Pivotal, respaldo Bajo"},{"cod":"SV2DA.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"DA","name":"Dauphin"},"modelo":{"cod":1,"name":"Valo Visita 4 patas"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M14","estructura":"B1","des":"Silla Visita modelo Valo Visita 4 patas, 4 patas, respaldo Bajo"},{"cod":"SV1IND.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":1,"name":"Dawy"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P2","respaldocolor":"P2","estructura":"P2","des":"Silla Visita modelo Dawy, 4 patas, respaldo Bajo"},{"cod":"SV1IND.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":2,"name":"Ergosilla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P34","respaldocolor":"P34","estructura":"B2","des":"Silla Visita modelo Ergosilla, 4 patas, respaldo Bajo"},{"cod":"SV1IND.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":3,"name":"Florencia"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P33","respaldocolor":"P33","estructura":"P33","des":"Silla Visita modelo Florencia, 4 patas, respaldo Bajo"},{"cod":"SV1IND.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":4,"name":"Isonorma"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P35","respaldocolor":"P35","estructura":"B2","des":"Silla Visita modelo Isonorma, 4 patas, respaldo Bajo"},{"cod":"SV1IND.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":5,"name":"Malba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P3","respaldocolor":"P3","estructura":"P3","des":"Silla Visita modelo Malba, 4 patas, respaldo Bajo"},{"cod":"SV1IND.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":6,"name":"Radi"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P32","respaldocolor":"P32","estructura":"P32","des":"Silla Visita modelo Radi, 4 patas, respaldo Bajo"},{"cod":"SV1IND.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":7,"name":"Todi"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P31","respaldocolor":"P31","estructura":"P31","des":"Silla Visita modelo Todi, 4 patas, respaldo Bajo"},{"cod":"SV1IND.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"IND","name":"Indumac"},"modelo":{"cod":8,"name":"Vigo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P30","respaldocolor":"P30","estructura":"P30","des":"Silla Visita modelo Vigo, 4 patas, respaldo Bajo"},{"cod":"SC2KE.01.18","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Work"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"","name":""},"asiento":"PU Negro","respaldocolor":"","estructura":"B1","des":"Silla Cajero modelo Work, Giratoria, respaldo "},{"cod":"SE2KE.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Black"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Black, Syncro, respaldo Alto"},{"cod":"SE2KE.02.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":2,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SO2KE.01.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Look"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Look, Pivotal, respaldo Medio"},{"cod":"BU1LI.01.01.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Fiona"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 1 cuerpo, respaldo Bajo"},{"cod":"BU1LI.02.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Fiona"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 2 cuerpo, respaldo Bajo"},{"cod":"BU1LI.03.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"Fiona"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Butaca modelo Fiona, 3 cuerpo, respaldo Bajo"},{"cod":"PF1LI.01.08.","producto":{"cod":"PF","name":"Pouf"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Fiona"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Pouf modelo Fiona, Fijo, respaldo "},{"cod":"SE1LI.01.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Business"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Ejecutiva modelo Business, Reclinable, respaldo Medio"},{"cod":"SE1LI.02.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Luxor"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco7","respaldocolor":"Eco7","estructura":"B3","des":"Silla Ejecutiva modelo Luxor, Reclinable, respaldo Medio"},{"cod":"SE1LI.03.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"Luxor"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco7","respaldocolor":"Eco7","estructura":"B3","des":"Silla Ejecutiva modelo Luxor, Reclinable, respaldo Alto"},{"cod":"SE1LI.04.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":4,"name":"New Jazz"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo New Jazz, Reclinable, respaldo Medio"},{"cod":"SE1LI.05.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":5,"name":"New Jazz"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo New Jazz, Reclinable, respaldo Alto"},{"cod":"SO1LI.01.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Cosmo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Operativa modelo Cosmo, Reclinable, respaldo Medio"},{"cod":"ST1LI.01.18","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Serrano"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"","name":""},"asiento":"Eco1","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo Serrano, Giratoria, respaldo "},{"cod":"SV1LI.01.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Business"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Visita modelo Business, Trineo, respaldo Medio"},{"cod":"SV1LI.02.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Luxor"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Silla Visita modelo Luxor, Trineo, respaldo Medio"},{"cod":"SF1LI.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":1,"name":"Chic"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":2,"name":"Chic"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.03.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":3,"name":"Chic"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T13","respaldocolor":"T13","estructura":"B3","des":"Sofa modelo Chic, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.04.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":4,"name":"Gauthier"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.05.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":5,"name":"Gauthier"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 2 cuerpo, respaldo Bajo"}
]


let sillas2 = [
                {"cod":"SF1LI.06.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":6,"name":"Gauthier"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Gauthier, 3 cuerpo, respaldo Bajo"}
]

let sillas3 = [
                {"cod":"SF1LI.07.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":7,"name":"Master"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 1 cuerpo, respaldo Bajo"},{"cod":"SF1LI.08.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":8,"name":"Master"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 2 cuerpo, respaldo Bajo"}
]




let sillas4 = [
                {"cod":"SF1LI.09.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":9,"name":"Master"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Master, 3 cuerpo, respaldo Bajo"}
]


let sillas5 = [
                {"cod":"SF1LI.10.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":10,"name":"Milano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 1 cuerpo, respaldo Bajo"}
]


let sillas6 = [
                {"cod":"SF1LI.11.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":11,"name":"Milano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.12.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":12,"name":"Milano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"T23","des":"Sofa modelo Milano, 3 cuerpo, respaldo Bajo"},{"cod":"SF1LI.13.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":13,"name":"Murano"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 1 cuerpo, respaldo Bajo"}
]


let sillas7 = [
                {"cod":"SF1LI.14.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":14,"name":"Murano"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 2 cuerpo, respaldo Bajo"},{"cod":"SF1LI.15.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"LI","name":"Liberona"},"modelo":{"cod":15,"name":"Murano"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T23","respaldocolor":"T23","estructura":"B3","des":"Sofa modelo Murano, 3 cuerpo, respaldo Bajo"},{"cod":"SF1MM.01.01.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":1,"name":"Roma"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 1 cuerpo, respaldo Bajo"},{"cod":"SF1MM.02.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":2,"name":"Roma"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 2 cuerpo, respaldo Bajo"},{"cod":"SF1MM.03.03.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":3,"name":"Roma"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Roma, 3 cuerpo, respaldo Bajo"},{"cod":"SF1MM.04.02.B","producto":{"cod":"SF","name":"Sofa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"MM","name":"Mmobili"},"modelo":{"cod":4,"name":"Venecia"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"Eco8","des":"Sofa modelo Venecia, 2 cuerpo, respaldo Bajo"},{"cod":"SA2MU.01.09.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"Mariposa"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P37","respaldocolor":"P37","estructura":"B2","des":"Silla Academica modelo Mariposa, 4 patas, respaldo Bajo"},{"cod":"SM2MU.01.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"IO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P36","respaldocolor":"P37","estructura":"B2","des":"Silla Multiproposito modelo IO, 4 patas, respaldo Bajo"},{"cod":"SM2MU.02.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":2,"name":"Juga"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P38","respaldocolor":"P38","estructura":"P38","des":"Silla Multiproposito modelo Juga, 4 patas, respaldo Bajo"},{"cod":"SM2MU.03.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":3,"name":"Mariposa"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P37","respaldocolor":"P37","estructura":"B2","des":"Silla Multiproposito modelo Mariposa, 4 patas, respaldo Bajo"},{"cod":"SM2MU.04.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":4,"name":"Menta"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P39","respaldocolor":"P40","estructura":"B3","des":"Silla Multiproposito modelo Menta, 4 patas, respaldo Bajo"},{"cod":"ST2MU.01.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":1,"name":"IO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P36","respaldocolor":"P36","estructura":"B2","des":"Silla Taburete modelo IO, 4 patas, respaldo Bajo"},{"cod":"ST2MU.02.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"MU","name":"MUMA"},"modelo":{"cod":2,"name":"Menta"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P39","respaldocolor":"P40","estructura":"B3","des":"Silla Taburete modelo Menta, 4 patas, respaldo Bajo"},{"cod":"BU2NS.01.01.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"CLUB 1 cuerpo"},"mecanismo":{"cod":1,"name":"1 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 1 cuerpo, 1 cuerpo, respaldo Bajo"},{"cod":"BU2NS.02.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"CLUB 2 cuerpo"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 2 cuerpo, 2 cuerpo, respaldo Bajo"}
]


let sillas8 = [
                {"cod":"BU2NS.03.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"CLUB 3 cuerpo"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"Eco1","des":"Butaca modelo CLUB 3 cuerpo, 3 cuerpo, respaldo Bajo"},{"cod":"BU2NS.04.08.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Estadio Omega"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P41","respaldocolor":"P41","estructura":"P41","des":"Butaca modelo Estadio Omega, Fijo, respaldo Bajo"},{"cod":"BU2NS.05.09.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"Hello 1 cuerpo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 1 cuerpo, 4 patas, respaldo Bajo"},{"cod":"BU2NS.06.12.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"Hello 1 cuerpo"},"mecanismo":{"cod":12,"name":"plato"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 1 cuerpo, plato, respaldo Bajo"},{"cod":"BU2NS.07.09.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":7,"name":"Hello 2 cuerpo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B3","des":"Butaca modelo Hello 2 cuerpo, 4 patas, respaldo Bajo"},{"cod":"SA2NS.01.09.B","producto":{"cod":"SA","name":"Silla Academica"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Samba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Academica modelo Samba, 4 patas, respaldo Bajo"},{"cod":"SC2NS.01.11.B","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Nargo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"TF1","estructura":"B1","des":"Silla Cajero modelo Nargo, Pivotal, respaldo Bajo"},{"cod":"SC2NS.02.11.B","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Smart"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Cajero modelo Smart, Pivotal, respaldo Bajo"},{"cod":"SE2NS.01.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Feniks"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B1","des":"Silla Ejecutiva modelo Feniks, Reclinable, respaldo Alto"},{"cod":"SI2NS.01.18.B","producto":{"cod":"SI","name":"Silla Infantil"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Catoon"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"D","respaldocolor":"D","estructura":"B1","des":"Silla Infantil modelo Catoon, Giratoria, respaldo Bajo"},{"cod":"SO2NS.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Jupiter"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Operativa modelo Jupiter, Pivotal, respaldo Alto"},{"cod":"SO2NS.02.11.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Smart"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B1","des":"Silla Operativa modelo Smart, Pivotal, respaldo Bajo"},{"cod":"SO2NS.03.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Taktik"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Taktik, Pivotal, respaldo Alto"},{"cod":"ST2NS.01.09.B","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Jola"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo Jola, 4 patas, respaldo Bajo"}
                ]



let sillas9 = [
                {"cod":"ST2NS.02.10","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"ZETA"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Taburete modelo ZETA, pedestal, respaldo "},{"cod":"SV2NS.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":1,"name":"Ascona"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco1","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Ascona, 4 patas, respaldo Bajo"},{"cod":"SV2NS.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"ISO"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF13","respaldocolor":"TF13","estructura":"B19","des":"Silla Visita modelo ISO, 4 patas, respaldo Bajo"},{"cod":"SV2NS.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Isonet"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF3","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Isonet, 4 patas, respaldo Bajo"},{"cod":"SV2NS.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Isoplastik"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P42","respaldocolor":"P42","estructura":"B19","des":"Silla Visita modelo Isoplastik, 4 patas, respaldo Bajo"},{"cod":"SV2NS.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"Samba"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Visita modelo Samba, 4 patas, respaldo Bajo"},{"cod":"SV2NS.06.18.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"Samba"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Eco8","respaldocolor":"Eco8","estructura":"B3","des":"Silla Visita modelo Samba, Giratoria, respaldo Bajo"},{"cod":"SV2NS.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":7,"name":"Silla Kalina"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Kalina, 4 patas, respaldo Bajo"},{"cod":"SV2NS.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":8,"name":"Silla Tulipan"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Tulipan, 4 patas, respaldo Bajo"},{"cod":"SV2NS.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":9,"name":"Silla Venus"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T10","respaldocolor":"","estructura":"B3","des":"Silla Visita modelo Silla Venus, 4 patas, respaldo Bajo"},{"cod":"SE1SI.01.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Archi con brazo PU"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF12","respaldocolor":"M14","estructura":"B1","des":"Silla Ejecutiva modelo Archi con brazo PU, Syncro, respaldo Alto"},{"cod":"SE1SI.02.16.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":2,"name":"Bart"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Bart, Syncro, respaldo Medio"},{"cod":"SE1SI.03.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":3,"name":"Identity"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B12","des":"Silla Ejecutiva modelo Identity, Syncro, respaldo Alto"},{"cod":"SE1SI.04.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":4,"name":"Rebbel con cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Rebbel con cabecero, Syncro, respaldo Alto"},{"cod":"SE1SI.05.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":5,"name":"Rebbel sin cabecero"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Ejecutiva modelo Rebbel sin cabecero, Syncro, respaldo Alto"},{"cod":"SE1SI.06.16.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":6,"name":"Zeus"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Ejecutiva modelo Zeus, Syncro, respaldo Alto"},{"cod":"SO1SI.01.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Cubo"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Cubo, reclinable, respaldo Bajo"},{"cod":"SO1SI.02.14.B","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":2,"name":"Vela"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Vela, reclinable, respaldo Bajo"},{"cod":"SO1SI.03.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":3,"name":"Wok Up"},"mecanismo":{"cod":14,"name":"reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"TF1","respaldocolor":"M1","estructura":"B1","des":"Silla Operativa modelo Wok Up, reclinable, respaldo Medio"},{"cod":"SV1SI.01.07.A","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Archi con brazo PP"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF12","respaldocolor":"M4","estructura":"B6","des":"Silla Visita modelo Archi con brazo PP, Trineo, respaldo Alto"},{"cod":"SV1SI.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":2,"name":"Strong"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Strong, 4 patas, respaldo Bajo"},{"cod":"BU2ST.01.18.A","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Conica"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF5","respaldocolor":"TF5","estructura":"B3","des":"Butaca modelo Conica, Giratoria, respaldo Alto"},{"cod":"BU2ST.02.18.A","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":2,"name":"EGG"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"TF2","respaldocolor":"TF2","estructura":"B2","des":"Butaca modelo EGG, Giratoria, respaldo Alto"},{"cod":"BU2ST.03.18.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":3,"name":"SWAN"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF14","respaldocolor":"TF14","estructura":"B2","des":"Butaca modelo SWAN, Giratoria, respaldo Bajo"},{"cod":"PO2ST.01.09.B","producto":{"cod":"PO","name":"Poltrona"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Kali"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF5","respaldocolor":"TF5","estructura":"B7","des":"Poltrona modelo Kali, 4 patas, respaldo Bajo"},{"cod":"SG2ST.01.16.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Lobby"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco5","respaldocolor":"Eco5","estructura":"B2","des":"Silla Gerencial modelo Lobby, Syncro, respaldo Alto"},{"cod":"SM2ST.01.09.B","producto":{"cod":"SM","name":"Silla Multiproposito"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Sati"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P18","respaldocolor":"P18","estructura":"B2","des":"Silla Multiproposito modelo Sati, 4 patas, respaldo Bajo"},{"cod":"SV2ST.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"ST","name":"Starway"},"modelo":{"cod":1,"name":"Thea"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"TF1","respaldocolor":"P1","estructura":"B3","des":"Silla Visita modelo Thea, 4 patas, respaldo Bajo"},{"cod":"BU1VC.01.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.02.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.03.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.04.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.05.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Aice, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.06.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.07.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.08.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.09.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.10.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"Aice, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.11.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":11,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.12.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":12,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.13.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":13,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.14.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":14,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.15.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":15,"name":"Aice, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Aice, asiento Tapiz y respaldo PP, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.16.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":16,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.17.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":17,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.18.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":18,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.19.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":19,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.20.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":20,"name":"Alice Polippropileno, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B3","des":"Butaca modelo Alice Polippropileno, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.21.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":21,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.22.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":22,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.23.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":23,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.24.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":24,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.25.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":25,"name":"Alice Polippropileno, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B1","des":"Butaca modelo Alice Polippropileno, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.26.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":26,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.27.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":27,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.28.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":28,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.29.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":29,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.30.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":30,"name":"Alice Polippropileno, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B2","des":"Butaca modelo Alice Polippropileno, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.31.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":31,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.32.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":32,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.33.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":33,"name":"ISO asiento tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T43","estructura":"B3","des":"Butaca modelo ISO asiento tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.34.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":34,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.35.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":35,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.36.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":36,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.37.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":37,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.38.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":38,"name":"ISO Polipropileno, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo ISO Polipropileno, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.39.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":39,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.40.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":40,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.41.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":41,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.42.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":42,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.43.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":43,"name":"ISO Polipropileno, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo ISO Polipropileno, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.44.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":44,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.45.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":45,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.46.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":46,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.47.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":47,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.48.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":48,"name":"ISO Polipropileno, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo ISO Polipropileno, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.49.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":49,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.50.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":50,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.51.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":51,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.52.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":52,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.53.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":53,"name":"ISO Tapizada, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B3","des":"Butaca modelo ISO Tapizada, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.54.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":54,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.55.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":55,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.56.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":56,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.57.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":57,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.58.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":58,"name":"ISO Tapizada, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Butaca modelo ISO Tapizada, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.59.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":59,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.60.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":60,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.61.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":61,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.62.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":62,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.63.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":63,"name":"ISO Tapizada, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B2","des":"Butaca modelo ISO Tapizada, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.64.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":64,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.65.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":65,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.66.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":66,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.67.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":67,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.68.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":68,"name":"Spring, asiento Tapiz y respaldo PP, pata Luna"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B3","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Luna, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.69.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":69,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.70.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":70,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.71.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":71,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.72.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":72,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.73.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":73,"name":"Spring, asiento Tapiz y respaldo PP, pata Recta"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B1","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Recta, 6 cuerpo, respaldo Bajo"},{"cod":"BU1VC.74.02.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":74,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":2,"name":"2 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 2 cuerpo, respaldo Bajo"},{"cod":"BU1VC.75.03.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":75,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":3,"name":"3 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 3 cuerpo, respaldo Bajo"},{"cod":"BU1VC.76.04.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":76,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":4,"name":"4 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 4 cuerpo, respaldo Bajo"},{"cod":"BU1VC.77.05.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":77,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":5,"name":"5 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 5 cuerpo, respaldo Bajo"},{"cod":"BU1VC.78.06.B","producto":{"cod":"BU","name":"Butaca"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":78,"name":"Spring, asiento Tapiz y respaldo PP, pata Splitz"},"mecanismo":{"cod":6,"name":"6 cuerpo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B2","des":"Butaca modelo Spring, asiento Tapiz y respaldo PP, pata Splitz, 6 cuerpo, respaldo Bajo"},{"cod":"PI1VC.01.09.M","producto":{"cod":"PI","name":"Piso Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Redondo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T11","respaldocolor":"","estructura":"B12","des":"Piso Taburete modelo Redondo, 4 patas, respaldo Medio"},{"cod":"SC1VC.01.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Polipropileno con brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Cajero modelo ISO Polipropileno con brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.02.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"ISO Polipropileno sin brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Cajero modelo ISO Polipropileno sin brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.03.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"ISO Tapizada con brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo ISO Tapizada con brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.04.18.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"ISO Tapizada sin brazo"},"mecanismo":{"cod":18,"name":"Giratoria"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo ISO Tapizada sin brazo, Giratoria, respaldo Medio"},{"cod":"SC1VC.05.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Fijo 680, Pivotal, respaldo Medio"},{"cod":"SC1VC.06.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Fijo 680, Pivotal, respaldo Alto"},{"cod":"SC1VC.07.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Regulable PU, Pivotal, respaldo Medio"},{"cod":"SC1VC.08.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby con brazo Regulable PU, Pivotal, respaldo Alto"},{"cod":"SC1VC.09.11.M","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby sin brazo, Pivotal, respaldo Medio"},{"cod":"SC1VC.10.11.A","producto":{"cod":"SC","name":"Silla Cajero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Cajero modelo Roby sin brazo, Pivotal, respaldo Alto"},{"cod":"SG1VC.01.14.A","producto":{"cod":"SG","name":"Silla Gerencial"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Bastian"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Eco1","respaldocolor":"Eco1","estructura":"B2","des":"Silla Gerencial modelo Bastian, Reclinable, respaldo Alto"},{"cod":"SO1VC.01.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Fijo 680, Pivotal, respaldo Medio"},{"cod":"SO1VC.02.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"Roby con brazo Fijo 680"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Fijo 680, Pivotal, respaldo Alto"},{"cod":"SO1VC.03.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Regulable PU, Pivotal, respaldo Medio"},{"cod":"SO1VC.04.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"Roby con brazo Regulable PU"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby con brazo Regulable PU, Pivotal, respaldo Alto"},{"cod":"SO1VC.05.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby sin brazo, Pivotal, respaldo Medio"},{"cod":"SO1VC.06.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Roby sin brazo"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Operativa modelo Roby sin brazo, Pivotal, respaldo Alto"},{"cod":"ST1VC.01.09.M","producto":{"cod":"ST","name":"Silla Taburete"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Taburete modelo ISO Polipropileno, 4 patas, respaldo Medio"},{"cod":"SV1VC.01.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"850 con brazo recto"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 850 con brazo recto, 4 patas, respaldo Medio"},{"cod":"SV1VC.02.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"870 con brazo curvo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 870 con brazo curvo, 4 patas, respaldo Medio"},{"cod":"SV1VC.03.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":3,"name":"870 sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo 870 sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":4,"name":"Alice, con brazo Tapizada "},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo Tapizada , 4 patas, respaldo Bajo"},{"cod":"SV1VC.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":5,"name":"Alice, con brazo, asiento Tapiz y reapaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo, asiento Tapiz y reapaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":6,"name":"Alice, con brazo, Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, con brazo, Polipropileno, 4 patas, respaldo Bajo"},{"cod":"SV1VC.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":7,"name":"Alice, sin brazo Tapizada "},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo Tapizada , 4 patas, respaldo Bajo"},{"cod":"SV1VC.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":8,"name":"Alice, sin brazo, asiento Tapiz y reapaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo, asiento Tapiz y reapaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":9,"name":"Alice, sin brazo, Polipropileno"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P44","respaldocolor":"P44","estructura":"B13","des":"Silla Visita modelo Alice, sin brazo, Polipropileno, 4 patas, respaldo Bajo"},{"cod":"SV1VC.10.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":10,"name":"ISO Polipropileno con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Visita modelo ISO Polipropileno con brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.11.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":11,"name":"ISO Polipropileno sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"P43","respaldocolor":"P43","estructura":"B1","des":"Silla Visita modelo ISO Polipropileno sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.12.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":12,"name":"ISO Tapizada con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Tapizada con brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.13.09.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":13,"name":"ISO Tapizada sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Tapizada sin brazo, 4 patas, respaldo Medio"},{"cod":"SV1VC.14.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":14,"name":"ISO Z"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"T24","respaldocolor":"T24","estructura":"B1","des":"Silla Visita modelo ISO Z, Trineo, respaldo Medio"},{"cod":"SV1VC.15.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":15,"name":"Spring con brazos, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.16.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":16,"name":"Spring con brazos, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":17,"name":"Spring con brazos, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B12","des":"Silla Visita modelo Spring con brazos, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1VC.18.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":18,"name":"Spring sin brazos, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":19,"name":"Spring sin brazos, asiento y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"P43","respaldocolor":"P43","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1VC.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":20,"name":"Spring sin brazos, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"T24","respaldocolor":"T24","estructura":"B12","des":"Silla Visita modelo Spring sin brazos, asiento y respaldo tapiz, 4 patas, respaldo Bajo"}
                ]




let sillas10 = [
                {"cod":"SE1CR.02.14.A","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Line"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"A","name":"Alto"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Reclinable, respaldo Alto"},{"cod":"SE1CR.03.14.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Line"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Reclinable, respaldo Medio"},{"cod":"SE1CR.04.07.M","producto":{"cod":"SE","name":"Silla Ejecutiva"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Line"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":["Eco1","Eco2"],"respaldocolor":["Eco1","Eco2"],"estructura":"B3","des":"Silla Ejecutiva modelo Line, Trineo, respaldo Medio"}
                ]





    
let sillasHiat0 = [
                    {"cod":"SO1CR.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"Cozy, con brazo fijo BRC 24"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 24, Pivotal, respaldo Alto"}
]

let sillasHiat1 = [
                    {"cod":"SO1CR.02.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Cozy, con brazo fijo BRC 24"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 24, Syncro, respaldo Alto"},{"cod":"SO1CR.03.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Cozy, con brazo fijo BRC 24"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 24, Pivotal, respaldo Medio"},{"cod":"SO1CR.04.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"Cozy, con brazo fijo BRC 24"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 24, Syncro, respaldo Medio"}
]

let sillasHiat2 = [
                    {"cod":"SO1CR.05.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Cozy, con brazo fijo BRC 25"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 25, Pivotal, respaldo Alto"},{"cod":"SO1CR.06.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"Cozy, con brazo fijo BRC 25"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 25, Syncro, respaldo Alto"},{"cod":"SO1CR.07.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":7,"name":"Cozy, con brazo fijo BRC 25"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 25, Pivotal, respaldo Medio"}
]

let sillasHiat3 = [
                    {"cod":"SO1CR.08.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":8,"name":"Cozy, con brazo fijo BRC 25"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 25, Syncro, respaldo Medio"},{"cod":"SO1CR.09.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":9,"name":"Cozy, con brazo fijo BRC 26"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 26, Pivotal, respaldo Alto"},{"cod":"SO1CR.10.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":10,"name":"Cozy, con brazo fijo BRC 26"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 26, Syncro, respaldo Alto"}
]


let sillasHiat4 = [
                    {"cod":"SO1CR.11.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":11,"name":"Cozy, con brazo fijo BRC 26"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 26, Pivotal, respaldo Medio"},{"cod":"SO1CR.12.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":12,"name":"Cozy, con brazo fijo BRC 26"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo fijo BRC 26, Syncro, respaldo Medio"}
]


let sillasHiat5 = [
                    {"cod":"SO1CR.13.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":13,"name":"Cozy, con brazo Regulable BRC 19"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 19, Pivotal, respaldo Alto"},{"cod":"SO1CR.14.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":14,"name":"Cozy, con brazo Regulable BRC 19"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 19, Syncro, respaldo Alto"}
]

let sillasHiat6 = [
                    {"cod":"SO1CR.15.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":15,"name":"Cozy, con brazo Regulable BRC 19"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 19, Pivotal, respaldo Medio"},{"cod":"SO1CR.16.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":16,"name":"Cozy, con brazo Regulable BRC 19"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 19, Syncro, respaldo Medio"}
]


let sillasHiat7 = [
                    {"cod":"SO1CR.17.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":17,"name":"Cozy, con brazo Regulable BRC 22"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 22, Pivotal, respaldo Alto"},{"cod":"SO1CR.18.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":18,"name":"Cozy, con brazo Regulable BRC 22"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 22, Syncro, respaldo Alto"}
]

let sillasHiat8 = [
                    {"cod":"SO1CR.19.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":19,"name":"Cozy, con brazo Regulable BRC 22"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 22, Pivotal, respaldo Medio"},{"cod":"SO1CR.20.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":20,"name":"Cozy, con brazo Regulable BRC 22"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Cozy, con brazo Regulable BRC 22, Syncro, respaldo Medio"}
]

let sillasHiat9 = [
                    {"cod":"SO1CR.21.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":21,"name":"Flash, con brazo fijo BRC 24"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 24, Pivotal, respaldo Alto"},{"cod":"SO1CR.22.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":22,"name":"Flash, con brazo fijo BRC 24"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 24, Syncro, respaldo Alto"}
]

let sillasHiat10 = [
                    {"cod":"SO1CR.23.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":23,"name":"Flash, con brazo fijo BRC 24"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 24, Pivotal, respaldo Medio"},{"cod":"SO1CR.24.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":24,"name":"Flash, con brazo fijo BRC 24"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 24, Syncro, respaldo Medio"}
]

let sillasHiat11 = [
                    {"cod":"SO1CR.25.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":25,"name":"Flash, con brazo fijo BRC 25"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 25, Pivotal, respaldo Alto"},{"cod":"SO1CR.26.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":26,"name":"Flash, con brazo fijo BRC 25"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 25, Syncro, respaldo Alto"}
]

let sillasHiat12 = [
                    {"cod":"SO1CR.27.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":27,"name":"Flash, con brazo fijo BRC 25"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 25, Pivotal, respaldo Medio"},{"cod":"SO1CR.28.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":28,"name":"Flash, con brazo fijo BRC 25"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 25, Syncro, respaldo Medio"}
]



let sillasHiat13 = [
                    {"cod":"SO1CR.29.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":29,"name":"Flash, con brazo fijo BRC 26"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 26, Pivotal, respaldo Alto"},{"cod":"SO1CR.30.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":30,"name":"Flash, con brazo fijo BRC 26"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 26, Syncro, respaldo Alto"}
]

let sillasHiat14 = [
                    {"cod":"SO1CR.31.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":31,"name":"Flash, con brazo fijo BRC 26"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 26, Pivotal, respaldo Medio"}
                    ]

let sillasHiat15 = [
                    {"cod":"SO1CR.32.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":32,"name":"Flash, con brazo fijo BRC 26"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo fijo BRC 26, Syncro, respaldo Medio"},{"cod":"SO1CR.33.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":33,"name":"Flash, con brazo Regulable BRC 19"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 19, Pivotal, respaldo Alto"}
]


let sillasHiat16 = [
                    {"cod":"SO1CR.34.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":34,"name":"Flash, con brazo Regulable BRC 19"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 19, Syncro, respaldo Alto"},{"cod":"SO1CR.35.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":35,"name":"Flash, con brazo Regulable BRC 19"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 19, Pivotal, respaldo Medio"}
]

let sillasHiat17 = [
                    {"cod":"SO1CR.36.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":36,"name":"Flash, con brazo Regulable BRC 19"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 19, Syncro, respaldo Medio"},{"cod":"SO1CR.37.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":37,"name":"Flash, con brazo Regulable BRC 22"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 22, Pivotal, respaldo Alto"}
]




let sillasHiat18 = [
                    {"cod":"SO1CR.38.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":38,"name":"Flash, con brazo Regulable BRC 22"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 22, Syncro, respaldo Alto"},{"cod":"SO1CR.39.11.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":39,"name":"Flash, con brazo Regulable BRC 22"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 22, Pivotal, respaldo Medio"}
]




let sillasHiat19 = [
                    {"cod":"SO1CR.40.16.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":40,"name":"Flash, con brazo Regulable BRC 22"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":["Hilat","M1"],"estructura":"B13","des":"Silla Operativa modelo Flash, con brazo Regulable BRC 22, Syncro, respaldo Medio"},{"cod":"SO1CR.42.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":42,"name":"Torino"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo Torino, Pivotal, respaldo Alto"},{"cod":"SO1CR.43.16.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":43,"name":"Torino"},"mecanismo":{"cod":16,"name":"Syncro"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo Torino, Syncro, respaldo Alto"}
]



let sillasHiat20 = [
                    {"cod":"SV1CR.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"Dream con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"Dream con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"Dream con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Dream con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"}
]




let sillasHiat21 = [
                    {"cod":"SV1CR.06.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"Dream sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":7,"name":"Dream sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P24","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.09.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":9,"name":"Dream sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Dream sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"}
]






let sillasHiat22 = [
                    {"cod":"SV1CR.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":10,"name":"Iso Revolution con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":11,"name":"Iso Revolution con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.13.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":13,"name":"Iso Revolution con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Iso Revolution con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.14.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":14,"name":"Iso Revolution sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.15.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":15,"name":"Iso Revolution sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P25","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":17,"name":"Iso Revolution sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Iso Revolution sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"}
]




let sillasHiat23 = [
                    {"cod":"SV1CR.18.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":18,"name":"Kyos con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":19,"name":"Kyos con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.21.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":21,"name":"Kyos con brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Kyos con brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CR.22.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":22,"name":"Kyos sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CR.23.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":23,"name":"Kyos sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P23","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CR.25.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":25,"name":"Kyos sin brazo, asiento y respaldo tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B15","des":"Silla Visita modelo Kyos sin brazo, asiento y respaldo tapiz, 4 patas, respaldo Bajo"},{"cod":"SO1CT.71.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":71,"name":"Q9 estructura Blanca, brazo fijo Dance"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B2","des":"Silla Operativa modelo Q9 estructura Blanca, brazo fijo Dance, Reclinable, respaldo Medio"}
]


let sillasHiat24 = [
                    {"cod":"SO1CT.72.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":72,"name":"Q9 estructura Blanca, sin brazo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B2","des":"Silla Operativa modelo Q9 estructura Blanca, sin brazo, Reclinable, respaldo Medio"},{"cod":"SO1CT.73.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":73,"name":"Q9 estructura Negra, brazo fijo Dance"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q9 estructura Negra, brazo fijo Dance, Reclinable, respaldo Medio"},{"cod":"SO1CT.74.14.M","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":74,"name":"Q9 estructura Negra, sin brazo"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B1","des":"Silla Operativa modelo Q9 estructura Negra, sin brazo, Reclinable, respaldo Medio"},{"cod":"SV1CT.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"850 con brazo recto"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 850 con brazo recto, 4 patas, respaldo Bajo"},{"cod":"SV1CT.02.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"870 con brazo curvo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 870 con brazo curvo, 4 patas, respaldo Bajo"},{"cod":"SV1CT.03.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"870 sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Visita modelo 870 sin brazo, 4 patas, respaldo Bajo"}
]


let sillasHiat25 = [
                    {"cod":"SV1CT.04.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Butterfly con brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.05.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Butterfly con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.07.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Butterfly sin brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.08.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Butterfly sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B13","des":"Silla Visita modelo Butterfly sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Isonet con brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B12","des":"Silla Visita modelo Isonet con brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CT.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Isonet sin brazo, asiento tapiz y respaldo Malla"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B12","des":"Silla Visita modelo Isonet sin brazo, asiento tapiz y respaldo Malla, 4 patas, respaldo Bajo"},{"cod":"SV1CT.12.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Isoscele con brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B12","des":"Silla Visita modelo Isoscele con brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"}
]




let sillasHiat26 = [
                    {"cod":"SV1CT.13.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Isoscele sin brazo, asiento y respaldo Tapiz"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B12","des":"Silla Visita modelo Isoscele sin brazo, asiento y respaldo Tapiz, 4 patas, respaldo Bajo"},{"cod":"SV1CT.17.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Pinko"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Pinko, 4 patas, respaldo Bajo"},{"cod":"SV1CT.18.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Pinko"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Pinko, Trineo, respaldo Bajo"},{"cod":"SV1CT.19.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Prisma con brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo Prisma con brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.20.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Prisma sin brazo, asiento tapiz y respaldo PP"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B12","des":"Silla Visita modelo Prisma sin brazo, asiento tapiz y respaldo PP, 4 patas, respaldo Bajo"},{"cod":"SV1CT.21.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Q9 estructura Blanca, brazo fijo Dance"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9 estructura Blanca, brazo fijo Dance, Trineo, respaldo Medio"},{"cod":"SV1CT.22.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Q9 estructura Blanca, sin brazo"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9 estructura Blanca, sin brazo, Trineo, respaldo Medio"},{"cod":"SV1CT.23.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":23,"name":"Q9 estructura Negra, brazo fijo Dance"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9 estructura Negra, brazo fijo Dance, Trineo, respaldo Medio"},{"cod":"SV1CT.24.07.M","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":24,"name":"Q9 estructura Negra, sin brazo"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"M","name":"Medio"},"asiento":"Hilat","respaldocolor":"M11","estructura":"B3","des":"Silla Visita modelo Q9 estructura Negra, sin brazo, Trineo, respaldo Medio"}
]



let sillasHiat27 = [
                    {"cod":"SV1CT.28.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":28,"name":"Urban"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Urban, 4 patas, respaldo Bajo"},{"cod":"SV1CT.29.07.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":29,"name":"Urban"},"mecanismo":{"cod":7,"name":"Trineo"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"M1","estructura":"B3","des":"Silla Visita modelo Urban, Trineo, respaldo Bajo"},{"cod":"SV2NS.10.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":10,"name":"Styl con brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Styl con brazo, 4 patas, respaldo Bajo"},{"cod":"SV2NS.11.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":11,"name":"Styl sin brazo"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B13","des":"Silla Visita modelo Styl sin brazo, 4 patas, respaldo Bajo"},{"cod":"SO2OM.01.11.A","producto":{"cod":"SO","name":"Silla Operativa"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"OM","name":"OMP"},"modelo":{"cod":1,"name":"New Alex"},"mecanismo":{"cod":11,"name":"Pivotal"},"respaldo":{"cod":"A","name":"Alto"},"asiento":"Hilat","respaldocolor":"Hilat","estructura":"B1","des":"Silla Operativa modelo New Alex, Pivotal, respaldo Alto"},{"cod":"SV2OM.01.09.B","producto":{"cod":"SV","name":"Silla Visita"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"OM","name":"OMP"},"modelo":{"cod":1,"name":"Rewind"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"B","name":"Bajo"},"asiento":"Hilat","respaldocolor":"P1","estructura":"B3","des":"Silla Visita modelo Rewind, 4 patas, respaldo Bajo"}
                  ]

let sillasRotas = [
                    {"cod":"BR1CR.01.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":1,"name":"BRC 19"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 19, Regulable"},{"cod":"BR1CR.02.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":2,"name":"BRC 20"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 20, Fijo"},{"cod":"BR1CR.03.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":3,"name":"BRC 22"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 22, Regulable"},{"cod":"BR1CR.04.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":4,"name":"BRC 24"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 24, Fijo"},{"cod":"BR1CR.05.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":5,"name":"BRC 25"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 25, Fijo"},{"cod":"BR1CR.06.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CR","name":"Cerantola"},"modelo":{"cod":6,"name":"BRC 26"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo BRC 26, Fijo"},{"cod":"AC1CT.01","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Aro cromado"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Aro cromado"},{"cod":"AC1CT.02","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Aro nylon"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Aro nylon"},{"cod":"AC1CT.03","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Capsula aire cajero"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Capsula aire cajero"},{"cod":"AC1CT.04","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Capsula aire silla"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Capsula aire silla"},{"cod":"AC1CT.05","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Capsula aire sillon"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Capsula aire sillon"},{"cod":"AC1CT.06","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Fuelle plastico"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Fuelle plastico"},{"cod":"AC1CT.07","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"Kit silla Alex Alta"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Kit silla Alex Alta"},{"cod":"AC1CT.08","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Kit silla Aviator"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Kit silla Aviator"},{"cod":"AC1CT.09","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Kit silla Pinko"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Kit silla Pinko"},{"cod":"AC1CT.10","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Kit silla Torino"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Kit silla Torino"},{"cod":"AC1CT.11","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Patin Nylon"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Patin Nylon"},{"cod":"AC1CT.12","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Pivotal"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Pivotal"},{"cod":"AC1CT.13","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Plato"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Plato"},{"cod":"AC1CT.14","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":14,"name":"Rueda Desmopan 50mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Desmopan 50mm"},{"cod":"AC1CT.15","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":15,"name":"Rueda Desmopan 65mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Desmopan 65mm"},{"cod":"AC1CT.16","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":16,"name":"Rueda Nylon 50mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Nylon 50mm"},{"cod":"AC1CT.17","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":17,"name":"Rueda Nylon 65mm"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rueda Nylon 65mm"},{"cod":"AC1CT.18","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":18,"name":"Sincronico"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Sincronico"},{"cod":"AC1CT.19","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":19,"name":"Tapa asiento exterior"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tapa asiento exterior"},{"cod":"AC1CT.20","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":20,"name":"Tapa asiento interior"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tapa asiento interior"},{"cod":"AC1CT.21","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":21,"name":"Tapa respaldo exterior"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tapa respaldo exterior"},{"cod":"AC1CT.22","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":22,"name":"Tapa respaldo interior"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Tapa respaldo interior"},{"cod":"BR1CT.01.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Fritz Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Fritz Negro, Regulable"},{"cod":"BR1CT.02.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":2,"name":"Gamma Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Gamma Negro, Fijo"},{"cod":"BR1CT.03.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":3,"name":"Gol Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Gol Negro, Fijo"},{"cod":"BR1CT.04.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":4,"name":"Golf Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Golf Negro, Fijo"},{"cod":"BR1CT.05.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":5,"name":"Isosceles Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Isosceles Negro, Fijo"},{"cod":"BR1CT.06.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":6,"name":"Mambo Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Mambo Negro, Regulable"},{"cod":"BR1CT.07.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":7,"name":"New Brick Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo New Brick Negro, Regulable"},{"cod":"BR1CT.08.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":8,"name":"Polo Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Polo Negro, Fijo"},{"cod":"BR1CT.09.14","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":9,"name":"Q9 Dance Aluminio"},"mecanismo":{"cod":14,"name":"Reclinable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Dance Aluminio, Reclinable"},{"cod":"BR1CT.10.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":10,"name":"Q9 Dance Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Dance Negro, Fijo"},{"cod":"BR1CT.11.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":11,"name":"Q9 Rap Blanco"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Q9 Rap Blanco, Fijo"},{"cod":"BR1CT.12.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":12,"name":"Rock Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Rock Negro, Regulable"},{"cod":"BR1CT.13.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":13,"name":"Vento Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Vento Negro, Regulable"},{"cod":"CA1CT.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Contatto"},"modelo":{"cod":1,"name":"Join"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero Join"},{"cod":"ES1CT.01","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":1,"name":"Espuma 0,5cms. D°25"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 0,5cms. D°25"},{"cod":"ES1CT.02","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":2,"name":"Espuma 2cms. D°21"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 2cms. D°21"},{"cod":"ES1CT.03","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":3,"name":"Espuma 4cms. D°25"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 4cms. D°25"},{"cod":"ES1CT.04","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":4,"name":"Espuma 4cms. D°30"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 4cms. D°30"},{"cod":"ES1CT.05","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":5,"name":"Espuma 5cms. D°25"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 5cms. D°25"},{"cod":"ES1CT.06","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":6,"name":"Espuma 5cms. D°30"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 5cms. D°30"},{"cod":"ES1CT.07","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":7,"name":"Espuma 6cms. D°25"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 6cms. D°25"},{"cod":"ES1CT.08","producto":{"cod":"ES","name":"Espuma"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"CT","name":"Espumatex"},"modelo":{"cod":8,"name":"Espuma 6cms. D°30"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Espuma 6cms. D°30"},{"cod":"AC1INT.01","producto":{"cod":"AC","name":"Accesorio"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"INT","name":"Intermob"},"modelo":{"cod":1,"name":"Pines"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Pines"},{"cod":"CA2KE.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"KE","name":"Kebel"},"modelo":{"cod":1,"name":"Identity Negro"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero Identity Negro"},{"cod":"BR1SI.01.15","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Oval Negro"},"mecanismo":{"cod":15,"name":"Regulable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo Oval Negro, Regulable"},{"cod":"CA1SI.01","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":1,"name":"Identity Negro"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero Identity Negro"},{"cod":"CA1SI.02","producto":{"cod":"CA","name":"Cabecero"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"SI","name":"Situp"},"modelo":{"cod":2,"name":"Archi"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Cabecero Archi"},{"cod":"BR1VC.01.08","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Negro"},"mecanismo":{"cod":8,"name":"Fijo"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo ISO Negro, Fijo"},{"cod":"BR1VC.02.17","producto":{"cod":"BR","name":"Brazo"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":2,"name":"ISO Negro"},"mecanismo":{"cod":17,"name":"Abatible"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Brazo modelo ISO Negro, Abatible"},{"cod":"PA1VC.01","producto":{"cod":"PA","name":"Paleta"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Plastica"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Paleta ISO Plastica"},{"cod":"RE1VC.01","producto":{"cod":"RE","name":"Rejilla"},"pais":{"cod":1,"name":"Nacional"},"proveedor":{"cod":"VC","name":"VC Industrial"},"modelo":{"cod":1,"name":"ISO Pintada"},"mecanismo":{"cod":null,"name":""},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"","des":"Rejilla ISO Pintada"}
                    ]
/*
let sillasEstructura = [
                        {"cod":"BA2NS.01.10","producto":
                          {"cod":"BA","name":"Base"},
                        "pais":{
                            "cod":2,"name":"Importado"},
                            "proveedor":{
                              "cod":"NS","name":"Nowy Styl"},
                              "modelo":{"cod":1,"name":"Dona"},
                              "mecanismo":{"cod":10,"name":"pedestal"},
                              "respaldo":{"cod":"","name":""},
                              "asiento":"","respaldocolor":"",
                                "estructura":"B2","des":"Base modelo Dona, pedestal"},
                              {"cod":"BA2NS.02.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":2,"name":"Lena plato cromado"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Lena plato cromado, pedestal"},{"cod":"BA2NS.03.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":3,"name":"Lena plato negro"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Lena plato negro, pedestal"},{"cod":"BA2NS.04.13","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":4,"name":"Rico"},"mecanismo":{"cod":13,"name":"plegable"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Rico, plegable"},{"cod":"BA2NS.05.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":5,"name":"SKY"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo SKY, pedestal"},{"cod":"BA2NS.06.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":6,"name":"Bistro"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Bistro, pedestal"},{"cod":"BA2NS.07.09","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":7,"name":"Sonia"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B3","des":"Base modelo Sonia, 4 patas"},{"cod":"BA2NS.08.09","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":8,"name":"Tracy"},"mecanismo":{"cod":9,"name":"4 patas"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Tracy, 4 patas"},{"cod":"BA2NS.09.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":9,"name":"Wicktor 110"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Wicktor 110, pedestal"},{"cod":"BA2NS.10.10","producto":{"cod":"BA","name":"Base"},"pais":{"cod":2,"name":"Importado"},"proveedor":{"cod":"NS","name":"Nowy Styl"},"modelo":{"cod":10,"name":"Wicktor 73"},"mecanismo":{"cod":10,"name":"pedestal"},"respaldo":{"cod":"","name":""},"asiento":"","respaldocolor":"","estructura":"B2","des":"Base modelo Wicktor 73, pedestal"}
                        ]
*/

/////////////////


let listaSillas = []
/*
let listaHijosTela = []
_.forEach( telas, (value, key) => {
  listaHijosTela = []
              if (!tt[value.modelo.name]) {
                console.log( value.modelo.name, value.cod )
              }else{
                    _.forEach( tt[value.modelo.name], (valueClE, keyClE) => {

                                            listaHijosTela.push( { 
                                                      cod: `${value.cod}.${keyClE+1}`, 
                                                      des: `${value.des} color ${valueClE}`,
                                                      cat: 21,
                                                      asiento: 0,
                                                      respaldocolor: 0,
                                                      estructura: 0
                                                    } )
                                         
                    })

                        listaSillas.push( { 
                                            cod: value.cod, 
                                            pais: value.pais.cod, 
                                            proveedor: value.proveedor.cod, 
                                            modelo: value.modelo.name, 
                                            mecanismo: value.mecanismo.cod, 
                                            respaldo: value.respaldo.cod, 
                                            des: value.des, 
                                            cat: 21,
                                            asiento: value.asiento,
                                            respaldocolor: value.respaldocolor,
                                            respaldo: value.respaldo.cod,
                                            estructura: value.estructura,
                                            producto: value.producto.cod,
                                            hijos: listaHijosTela
                                          } )

              }

})




_.forEach( sillasRotas, (value, key) => {
  listaSillas.push( { cod: value.cod, 
                      pais: value.pais.cod, 
                      proveedor: value.proveedor.cod, 
                      modelo: value.modelo.name, 
                      mecanismo: value.mecanismo.cod, 
                      respaldo: value.respaldo.cod,
                      des: value.des, 
                      cat: 21,
                      asiento: value.asiento,
                      respaldocolor: value.respaldocolor,
                      respaldo: value.respaldo.cod,
                      estructura: value.estructura,
                      producto: value.producto.cod,
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

            let serAsiento = []
            let serRespaldo = []
            let hijosServicios = []
        _.forEach( servicios, (value, key) => {   
          serAsiento = []
          serRespaldo = []
          hijosServicios = []

          if(value.asiento.length > 0){   
                _.forEach( value.asiento, (valueAsiento, keyAsiento) => {
                   _.forEach( listacolores[valueAsiento], (valueClA, keyClA) => {
                       _.forEach( tt[valueClA], (valueTapisAsiento, keyTapisAsientoA) => {
                           serAsiento.push( { cod: `${valueAsiento},${keyClA+1},${keyTapisAsientoA+1}`,name: `${valueClA} color ${valueTapisAsiento}` } )
                       })
                   })
                })
            }else{
               //this array is empty
            }

          if(value.respaldocolor.length > 0){   
                _.forEach( value.respaldocolor, (valueRespaldo, keyRespaldo) => {
                   _.forEach( listacolores[valueRespaldo], (valueClA, keyClA) => {
                       _.forEach( tt[valueClA], (valueTapisAsiento, keyTapisAsientoA) => {
                           serRespaldo.push( { cod: `${valueRespaldo},${keyClA+1},${keyTapisAsientoA+1}`,name: `${valueClA} color ${valueTapisAsiento}` } )
                       })
                   })
                })
            }else{
               //this array is empty
            }

            if ( serAsiento.length == 0) {
                      hijosServicios.push( 
                                      { 
                                          cod: `${value.cod}.0.0`, 
                                          des: `${value.des}`,
                                          cat: 22,
                                          asiento: 0,
                                          respaldocolor: 0,
                                          estructura: 0
                                        } 
                                    )
            } else {

                _.forEach( serAsiento, (va, ka) => {
                  if ( serRespaldo.length == 0) {
                      hijosServicios.push( 
                                      { 
                                          cod: `${value.cod}.${va.cod}.0`, 
                                          des: `${value.des}, ${va.name}`,
                                          cat: 22,
                                          asiento: `${va.cod}`,
                                          respaldocolor: 0,
                                          estructura: 0
                                        } 
                                    )
                  }else{
                    _.forEach( serRespaldo, (vr, kr) => {
                        hijosServicios.push( 
                                        { 
                                            cod: `${value.cod}.${va.cod}.${vr.cod}`, 
                                            des: `${value.des}, asiento ${va.name}, respaldo ${vr.name}`,
                                            cat: 22,
                                            asiento: `${va.cod}`,
                                            respaldocolor: `${vr.cod}`,
                                            estructura: 0
                                          } 
                                      )
                    })
                  }
                })

            }


            listaSillas.push( { cod: value.cod,
                                pais: value.pais.cod, 
                                proveedor: value.proveedor.cod, 
                                modelo: value.modelo.name, 
                                mecanismo: value.mecanismo.cod, 
                                respaldo: value.respaldo.cod,
                                des: value.des,
                                cat: 22,
                                asiento: value.asiento,
                                respaldocolor: value.respaldocolor,
                                estructura: value.estructura,
                                producto: value.producto.cod,
                                hijos: hijosServicios } )

        })
*/


        _.forEach( sillasHiat27, (value, key) => {    
            let listaHijos = []
            let clAsiento = []
            let clRespaldo = []
            let clEstructura = []
            let contadorAsiento = 1
            let contadorRespaldo = 1
            if (Array.isArray(value.asiento)) {
              _.forEach( value.asiento, (valueAsiento, keyAsiento) => {
                //_.findIndex(listacolores, function(o) { return o.user == valueAsiento  })   
                
                //SI SON TAPICES
                if (valueAsiento == 'Hilat') {

                       _.forEach( tt, (v, k) => {

                          _.forEach( v, (vv, kk) => {

                            clAsiento.push( { cod: `H,${contadorAsiento},${kk+1}`,name: `Tapiz ${k} ${vv}` } )

                          })

                          contadorAsiento += 1
                       
                       })

                } else {

                      if ( tapizDiccionario.includes(valueAsiento) ) {
                          _.forEach( listacolores[valueAsiento], (valueClA, keyClA) => {
                              _.forEach( tt[valueClA], (valueTapisAsiento, keyTapisAsientoA) => {
                                  clAsiento.push( { cod: `${valueAsiento},${keyClA+1},${keyTapisAsientoA+1}`,name: `Tapiz ${valueClA} ${valueTapisAsiento}` } )
                              })
                          })
                      } else{
                          _.forEach( listacolores[valueAsiento], (valueClA, keyClA) => {
                              clAsiento.push( { cod: `${valueAsiento},${keyClA+1}` ,name: `${disccionariosColores[valueAsiento]}${valueClA}` } )
                          })    
                      }

                }



                      if (!listacolores[valueAsiento]) {
                        console.log( valueAsiento, value.cod, `ASIENTO` ) 
                      }


              })
            } else {


                if (value.asiento == 'Hilat') {

                       _.forEach( tt, (v, k) => {

                          _.forEach( v, (vv, kk) => {

                            clAsiento.push( { cod: `H,${contadorAsiento},${kk+1}`,name: `Tapiz ${k} ${vv}` } )

                          })

                          contadorAsiento += 1
                       
                       })

                } else {

                      if ( tapizDiccionario.includes(value.asiento) ) {
                          _.forEach( listacolores[value.asiento], (valueClA, keyClA) => {
                              _.forEach( tt[valueClA], (valueTapisAsiento, keyTapisAsientoA) => {
                                  clAsiento.push( { cod: `${value.asiento},${keyClA+1},${keyTapisAsientoA+1}`,name: `Tapiz ${valueClA} ${valueTapisAsiento}` } )
                              })
                          })
                      } else{
                        _.forEach( listacolores[value.asiento], (valueClA, keyClA) => {
                            clAsiento.push( { cod: `${value.asiento},${keyClA+1}` ,name: `${disccionariosColores[value.asiento]}${valueClA}`} )
                        })
                      }

                      if (!listacolores[value.asiento]) {
                        console.log( value.asiento, value.cod, `ASIENTO` )
                      }
          
                }
            }


/////////RESPALDOS

            if (Array.isArray(value.respaldocolor)) {


                    _.forEach( value.respaldocolor, (valueRes, keyRes) => {
                      //_.findIndex(listacolores, function(o) { return o.user == valueAsiento  })   
                        



                          
                if (valueRes == 'Hilat') {
                  
                       _.forEach( tt, (v, k) => {

                          _.forEach( v, (vv, kk) => {

                            clRespaldo.push( { cod: `H,${contadorRespaldo},${kk+1}`,name: `Tapiz ${k} ${vv}` } )

                          })

                          contadorRespaldo += 1
                       
                       })

                } else {

                            if ( tapizDiccionario.includes(valueRes) ) {
                                  _.forEach( listacolores[valueRes], (valueClR, keyClR) => {
                                      _.forEach( tt[valueClR], (valueTapisRespaldo, keyTapisRespaldo) => {
                                            clRespaldo.push( { cod: `${valueRes},${keyClR+1},${keyTapisRespaldo+1}`,name: `Tapiz ${valueClR} ${valueTapisRespaldo}` } )
                                      })
                                  })
                            } else {
                                  _.forEach( listacolores[valueRes], (valueClR, keyClR) => {
                                      clRespaldo.push( { cod: `${valueRes},${keyClR+1}`,name: `${disccionariosColores[valueRes]}${valueClR}`  } )
                                  })
                            }
                }


                if (!listacolores[valueRes]) {
                          //console.log( valueRes, value.cod, `RESPALDO` ) 
                        }





                        
                    })


            } else {


                
                if (value.respaldocolor == 'Hilat') {
                    
                       _.forEach( tt, (v, k) => {

                          _.forEach( v, (vv, kk) => {

                            clRespaldo.push( { cod: `H,${contadorRespaldo},${kk+1}`,name: `Tapiz ${k} ${vv}` } )

                          })

                          contadorRespaldo += 1
                       
                       })

                } else {


                            if ( tapizDiccionario.includes(value.respaldocolor) ) {
                            
                                  _.forEach( listacolores[value.respaldocolor], (valueClR, keyClR) => {
                                      _.forEach( tt[valueClR], (valueTapisRespaldo, keyTapisRespaldo) => {
                                            clRespaldo.push( { cod: `${value.respaldocolor},${keyClR+1},${keyTapisRespaldo+1}`,name: `Tapiz ${valueClR} ${valueTapisRespaldo}` } )
                                      })
                                  })

                            } else {
                                  _.forEach( listacolores[value.respaldocolor], (valueClR, keyClR) => {
                                      clRespaldo.push( { cod: `${value.respaldocolor},${keyClR+1}`,name: `${disccionariosColores[value.respaldocolor]}${valueClR}`  } )
                                  })
                            }

                }


                if (!listacolores[value.respaldocolor]) {
                  //console.log( value.respaldocolor, value.cod, `RESPALDO` )
                }

              
            

            }





//////ESTRUCTURA


              if (!listacolores[value.estructura]) {
                console.log( value.estructura, value.cod, `ESTRUCTURA` )
              }else{


                   if ( tapizDiccionario.includes(value.estructura) ) {
                   
                         _.forEach( listacolores[value.estructura], (valueClE, keyClE) => {
                             _.forEach( tt[valueClE], (valueTapisEstructura, keyTapisEstructura) => {
                                   clEstructura.push( { cod: `${value.estructura},${keyClE+1},${keyTapisEstructura+1}`,name: `Tapiz ${valueClE} ${valueTapisEstructura}`  } )
                             })
                         })
                   } else {
                    
                          _.forEach( listacolores[value.estructura], (valueClE, keyClE) => {
                              clEstructura.push( { cod: `${value.estructura},${keyClE+1}`,name: `${disccionariosColores[value.estructura]}${valueClE}`  } )
                          })

                   }



              }








                _.forEach( clAsiento, (va, ka) => {
                  if ( clRespaldo.length == 0) {
                    _.forEach( clEstructura, (ve, ke) => {
                      //`${va.cod},${ka}`
                      //${ve.cod},${ke}`
                      listaHijos.push( 
                                      { 
                                          cod: `${value.cod}.${va.cod}.0.${ve.cod}`, 
                                          des: `${value.des}, asiento ${va.name}, estructura ${ve.name}`,
                                          cat: 20,
                                          asiento: `${va.cod}`,
                                          respaldocolor: 0,
                                          estructura: `${ve.cod}`
                                        } 
                                    )
                    })
                  }else{
                    _.forEach( clRespaldo, (vr, kr) => {
                      _.forEach( clEstructura, (ve, ke) => {
                        //${va.cod},${ka}
                        //${vr.cod},${kr}
                        //`${ve.cod},${ke}`
                        listaHijos.push( 
                                        { 
                                            cod: `${value.cod}.${va.cod}.${vr.cod}.${ve.cod}`, 
                                            des: `${value.des}, asiento ${va.name}, respaldo ${vr.name}, estructura ${ve.name}`,
                                            cat: 20,
                                            asiento: `${va.cod}`,
                                            respaldocolor: `${vr.cod}`,
                                            estructura: `${ve.cod}`
                                          } 
                                      )
                      })
                    })
                  }
                })
            listaSillas.push( { cod: value.cod,
                                pais: value.pais.cod, 
                                proveedor: value.proveedor.cod, 
                                modelo: value.modelo.name, 
                                mecanismo: value.mecanismo.cod, 
                                respaldo: value.respaldo.cod,
                                des: value.des,
                                cat: 20,
                                asiento: value.asiento,
                                respaldocolor: value.respaldocolor,
                                estructura: value.estructura,
                                producto: value.producto.cod,
                                hijos: listaHijos } )
        })



  console.log('se mando')
          socket.emit('sillas', listaSillas, (respuesta) => { 
            console.log( respuesta )

          }) 



/*
let insert = `INSERT INTO producto (CODIGO_PRODUCTO, DESCRIPCION, CATEGORIA, CODIGO_GENERICO, FAMILIA, TEMPORADA, 
            GESTION, DIMENSION, RELACION, TIPO, TERMINO,
            RUTA, RUTA1, RUTA2, CAD_2D, CAD_3D,
            POSICION, CUERPO, FRENTE, CANTO, TRASCARA) VALUES ` 

    _.forEach(listaSillas, (v, k) => {

      insert += `('${v.cod}','${v.des}','${v.cat}','','generico','2',
             '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
             '${v.cod}_img.jpg','${v.cod}_img_1.jpg','${v.producto}','${v.cod}.dwg','${v.cod}.dwg',`

      insert += ( Array.isArray(v.asiento) ) ? `'${v.asiento[0]}','${v.asiento[1]}',` : `'${v.asiento}','0',`

      insert += (Array.isArray(v.respaldocolor)) ? `'${v.respaldocolor[0]}','${v.respaldocolor[1]}',` : `'${v.respaldocolor}','0',`

      insert += `'${v.estructura}'),`
      _.forEach(v.hijos, (vv, kk) => {
        insert += `('${vv.cod}','${vv.des}','${vv.cat}','${v.cod}','silla','2',
               '${v.pais}','${v.proveedor}','${v.modelo}','${v.mecanismo}','${v.respaldo}',
               '${vv.cod}_img.jpg','${vv.cod}_img_1.jpg','${v.producto}','${vv.cod}.dwg','${vv.cod}.dwg',
               '${vv.asiento}','0','${vv.respaldocolor}','0','${vv.estructura}'),`
      })
    })
insert = insert.substring(0, insert.length-1)
*/



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