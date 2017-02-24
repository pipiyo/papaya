import React from 'react'

import Reflux from 'reflux'

import _ from 'lodash'

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
    form: {
          ejecutivo: [],
          cliente: [] 
    },
    buscar: null
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


    this.obj.showProyecto = this.showProyecto
    this.obj.showRocha = this.showRocha
    this.obj.showServicio = this.showServicio
    this.obj.showSubServicio = this.showSubServicio
    this.obj.buscar = this.buscar



    socket.emit('getRochas', ( y ) => {

          _.forEach(y.form, (value, key) => {
            this.obj.form.ejecutivo[key] = { ejecutivo: `${value.NOMBRES} ${value.APELLIDO_PATERNO} ${value.APELLIDO_MATERNO}`  }
          })

          _.forEach(y.cs, (vcs, kcs) => {
            this.listaCss[kcs] = { cs: vcs.cs, cp: vcs.cp, inicio: vcs.inicio.substring(0,10), entrega: vcs.entrega.substring(0,10), css: [], show: false }
            _.forEach(y.css, (vcss, kcss) => {
              if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {
                this.listaCss[kcs].css.push( { css: vcss.CODIGO_SUBSERVICIO, cs: vcss.SUB_CODIGO_SERVICIO, inicio: vcss.SUB_FECHA_INICIO.substring(0,10), entrega: vcss.SUB_FECHA_ENTREGA.substring(0,10)  } )
              }
            })
          })


let min,max = null

          _.forEach(y.np, (vnp, knp) => {
            this.obj.proyectos[knp] = { np: vnp, cp: [], show: false, ingreso: null, entrega: null } 
                     
            min,max = null
            _.forEach(y.cp, (vcp, kcp) => {
              if (vcp.np == vnp) {
                this.obj.proyectos[knp].cp.push({
                                                    np: vcp.np, 
                                                    cp: vcp.cp, 
                                                    cs: [], 
                                                    show: false,
                                                    ingreso: vcp.ingreso.substring(0,10),
                                                    entrega: vcp.entrega.substring(0,10)
                                                })

if (min == null) {
  min =  vcp.ingreso.substring(0,10)
}

if (max == null) {
  max =  vcp.entrega.substring(0,10)
}


                min = ( min > vcp.ingreso.substring(0,10) ) ? min : vcp.ingreso.substring(0,10)
                max = ( max < vcp.entrega.substring(0,10) ) ? max : vcp.entrega.substring(0,10)

              }
            })// cp


            this.obj.proyectos[knp].ingreso = min
            this.obj.proyectos[knp].entrega = max


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
                this.trigger( this.obj )
        })


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


    this.obj.showProyecto = this.showProyecto
    this.obj.showRocha = this.showRocha
    this.obj.showServicio = this.showServicio
    this.obj.showSubServicio = this.showSubServicio
    this.obj.buscar = this.buscar



    let form = {
                  rocha: e.elements[0].value,
                  proyecto: e.elements[1].value,
                  mas: e.elements[2].value,
                  menos: e.elements[3].value,
                  ejecutivo: e.elements[4].value,
                  cliente: e.elements[5].value,
                }


    socket.emit('getRochaFiltro', form, ( y ) => {


      this.obj.proyectos = []


          _.forEach(y.form, (value, key) => {
            this.obj.form.ejecutivo[key] = { ejecutivo: `${value.NOMBRES} ${value.APELLIDO_PATERNO} ${value.APELLIDO_MATERNO}`  }
          })




          _.forEach(y.cs, (vcs, kcs) => {
            this.listaCss[kcs] = { cs: vcs.cs, cp: vcs.cp, css: [], inicio: vcs.inicio.substring(0,10), entrega: vcs.entrega.substring(0,10), css: [], show: false }
            _.forEach(y.css, (vcss, kcss) => {
              if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {
                this.listaCss[kcs].css.push( { css: vcss.CODIGO_SUBSERVICIO, cs: vcss.SUB_CODIGO_SERVICIO, inicio: vcss.SUB_FECHA_INICIO.substring(0,10), entrega: vcss.SUB_FECHA_ENTREGA.substring(0,10)   } )
              }
            })
          })

let min,max = null


          _.forEach(y.np, (vnp, knp) => {
            this.obj.proyectos[knp] = { np: vnp, cp: [], show: false, ingreso: null, entrega: null } 
            
              min,max = null
            _.forEach(y.cp, (vcp, kcp) => {
              if (vcp.np == vnp) {
                this.obj.proyectos[knp].cp.push( {
                                                    np: vcp.np, 
                                                    cp: vcp.cp, 
                                                    cs: [], 
                                                    show: false,
                                                    ingreso: vcp.ingreso.substring(0,10),
                                                    entrega: vcp.entrega.substring(0,10)
                                                } )
             


if (min == null) {
  min =  vcp.ingreso.substring(0,10)
}

if (max == null) {
  max =  vcp.entrega.substring(0,10)
}


                min = ( min > vcp.ingreso.substring(0,10) ) ? min : vcp.ingreso.substring(0,10)
                max = ( max < vcp.entrega.substring(0,10) ) ? max : vcp.entrega.substring(0,10)




              }
            })// cp

            this.obj.proyectos[knp].ingreso = min
            this.obj.proyectos[knp].entrega = max



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
                this.trigger( this.obj )

    })


  }


})

export default CuadroRochaStore