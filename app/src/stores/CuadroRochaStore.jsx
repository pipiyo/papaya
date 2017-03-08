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
    socket.emit('sillas', 'cafe')
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