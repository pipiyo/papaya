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
    selected: null,
    form: {
          ejecutivo: [],
          cliente: [] 
    },
    buscar: null,
    calendario: { 
                  mes: null,
                  dia: null,
                  sumar: 0,
                  restar: 0,
                  subirmes: null,
                  bajarmes: null
                    }
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

    this.getProyectos('getRochas', null, null)


  },

  getInitialState: function() {

    this.getObj()

    return this.obj

  },

  showProyecto: function(e){
    CuadroRochaActions._showProyecto(e.target.textContent,e.currentTarget)
  },
  _showProyecto: function(e, i){
    let index = _.findIndex(this.obj.proyectos, { np: `${e}` })
    this.obj.proyectos[index].show = this.obj.proyectos[index].show ? false : true 
    
    /* Opacity */
    if(this.obj.proyectos[index].show){
      this.obj.selected = i.getAttribute('data-npok')
    }else{
      this.obj.selected = null
    }
    this.trigger( this.obj )
  },


  showRocha: function(e){
    CuadroRochaActions._showRocha(e.target,e.currentTarget)
  },
  _showRocha: function(e,i){
    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  rocha: e.getAttribute('data-indexrocha'),
                }

    this.obj.proyectos[index.proyecto].cp[index.rocha].show = this.obj.proyectos[index.proyecto].cp[index.rocha].show ? false : true 
    this.obj.selected = i.getAttribute('data-npok')
    this.trigger( this.obj )
  },


  showServicio: function(e){
    CuadroRochaActions._showServicio(e.target,e.currentTarget)
  },
  _showServicio: function(e,i){

    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  servicio: e.getAttribute('data-indexservicio'),
                  rocha: e.getAttribute('data-indexrocha')
                }

    this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show = this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show ? false : true 
    this.obj.selected = i.getAttribute('data-npok')
    this.trigger( this.obj )
  },




  showSubServicio: function(e){
    CuadroRochaActions._showSubServicio(e.target,e.currentTarget)
  },
  _showSubServicio: function(e,i){
    // let index = { 
    //               proyecto: e.getAttribute('data-indexproyecto'),
    //               servicio: e.getAttribute('data-indexservicio'),
    //               rocha: e.getAttribute('data-indexrocha')
    //             }
    // this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show = this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show ? false : true 
    this.obj.selected = i.getAttribute('data-npok')
    this.trigger( this.obj )
  },





  buscar: function(e) {
    e.preventDefault()
    CuadroRochaActions._buscar(e.target)
  },

  _buscar: function(e) {


    this.getProyectos('getRochaFiltro', e)


  },  




  subirmes: function() {
    CuadroRochaActions._subirmes()
  },  
  _subirmes: function() {


    this.getProyectos('getRochas', null, 'add')
    this.obj.calendario.sumar = this.obj.calendario.sumar + 1
    this.obj.calendario.restar = this.obj.calendario.sumar - 1

  },  

  bajarmes: function() {
    CuadroRochaActions._bajarmes()
  },  
  _bajarmes: function() {


    this.getProyectos('getRochas', null, 'subtract')
    this.obj.calendario.sumar = this.obj.calendario.sumar - 1
    this.obj.calendario.restar = this.obj.calendario.sumar + 1

  },

  getProyectos: function(method, event, operator) {

//console.log( moment().daysInMonth() )

/*
    _.forEach(moment.months(2), (value, key) => {
      this.obj.calendario[key] = value
    })
*/

  if ( operator == 'add' ) {

    this.obj.calendario.now = this.obj.calendario.now.add(1, 'months')

  }else if( operator == 'subtract' ) {

    this.obj.calendario.now = this.obj.calendario.now.subtract(1, 'months')

  }else{
    this.obj.calendario.now = moment()
  }

      //this.obj.calendario.now = moment()

      this.obj.calendario.mes = moment.months(this.obj.calendario.now.month())
      this.obj.calendario.numeromes = this.obj.calendario.now.month()
      this.obj.calendario.dia = this.obj.calendario.now.daysInMonth()

      this.obj.calendario.subirmes = this.subirmes
      this.obj.calendario.bajarmes =this.bajarmes

      this.obj.showProyecto = this.showProyecto
      this.obj.showRocha = this.showRocha
      this.obj.showServicio = this.showServicio
      this.obj.showSubServicio = this.showSubServicio
      this.obj.buscar = this.buscar
      this.obj.destacado = this.destacado
      this.obj.selected = null


let form = null

if (event) {

    form = {
                  rocha: event.elements[0].value,
                  proyecto: event.elements[1].value,
                  ejecutivo: event.elements[2].value,
                  cliente: event.elements[3].value,
                }

}

  this.obj.proyectos= []

    socket.emit(method, form, ( y ) => {

          let i = 0
          let ok = 0

          let csmax = null
          let csmin = null
          let csdia = []

          let cssmax = null
          let cssmin = null
          let cssdia = []

          _.forEach(y.form, (value, key) => {
            this.obj.form.ejecutivo[key] = { ejecutivo: `${value.NOMBRES} ${value.APELLIDO_PATERNO} ${value.APELLIDO_MATERNO}`  }
          })





          _.forEach(y.cs, (vcs, kcs) => {

            csmax = null
            csmin = null
            csdia = []

csmin = (moment(moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD')).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD').format('D') : 'antes' )
csmax = (moment(moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD')).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD').format('D') : 'despues' )


                _.times(this.obj.calendario.dia, (r) => {
                            //console.log(this.props.obj.np, this.props.obj.ingresod, this.props.obj.entregad  )

if ( csmin == 'despues' || csmax == 'antes' ) {
        csdia.push( <div 
                       key={`${vcs.csnombre}${r}${vcs.cs}`} 
                       class={`day`} >
                    <p></p>
                </div> )
}else if( csmin == 'antes' ){
        csdia.push( <div 
                        key={`${vcs.csnombre}${r}${vcs.cs}`} 
                        class={ ( ++r <= csmax  ) ? `day ok ${vcs.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}else if( csmax == 'despues' ){
        csdia.push( <div 
                        key={`${vcs.csnombre}${r}${vcs.cs}`} 
                        class={ ( ++r >= csmin ) ? `day ok ${vcs.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}else{
        csdia.push( <div 
                        key={`${vcs.csnombre}${r}${vcs.cs}`} 
                        class={ ( ++r >= csmin && r++ <= csmax  ) ? `day ok ${vcs.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}

                })

            this.listaCss[kcs] = {  
                                  estado: null, 
                                  csnombre: vcs.csnombre, 
                                  cs: vcs.cs, 
                                  cp: vcs.cp, 
                                  inicio: vcs.inicio.substring(0,10), 
                                  entrega: vcs.entrega.substring(0,10), 
                                  css: [], 
                                  show: false,
                                  dia: csdia }
            

            i = 0
            ok = 0

            _.forEach(y.css, (vcss, kcss) => {
              if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {

            cssmax = null
            cssmin = null
            cssdia = []


cssmin = (moment(moment(vcss.SUB_FECHA_INICIO.substring(0,10), 'YYYY-MM-DD')).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(moment(vcss.SUB_FECHA_INICIO.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcss.SUB_FECHA_INICIO.substring(0,10), 'YYYY-MM-DD').format('D') : 'antes' )
cssmax = (moment(moment(vcss.SUB_FECHA_ENTREGA.substring(0,10), 'YYYY-MM-DD')).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(moment(vcss.SUB_FECHA_ENTREGA.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcss.SUB_FECHA_ENTREGA.substring(0,10), 'YYYY-MM-DD').format('D') : 'despues' )


                _.times(this.obj.calendario.dia, (x) => {
                            //console.log(this.props.obj.np, this.props.obj.ingresod, this.props.obj.entregad  )

if ( cssmin == 'despues' || cssmax == 'antes' ) {
        cssdia.push( <div 
                       key={`${vcss.CODIGO_SUBSERVICIO}${x}${vcss.SUB_CODIGO_SERVICIO}`} 
                       class={`day`} >
                    <p></p>
                </div> )
}else if( cssmin == 'antes' ){
        cssdia.push( <div 
                        key={`${vcss.CODIGO_SUBSERVICIO}${x}${vcss.SUB_CODIGO_SERVICIO}`} 
                        class={ ( ++x <= cssmax  ) ? `day ok ${vcss.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}else if( cssmax == 'despues' ){
        cssdia.push( <div 
                        key={`${vcss.CODIGO_SUBSERVICIO}${x}${vcss.SUB_CODIGO_SERVICIO}`} 
                        class={ ( ++x >= cssmin ) ? `day ok ${vcss.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}else{
        cssdia.push( <div 
                        key={`${vcss.CODIGO_SUBSERVICIO}${x}${vcss.SUB_CODIGO_SERVICIO}`} 
                        class={ ( ++x >= cssmin && x++ <= cssmax  ) ? `day ok ${vcss.nombre.toLowerCase()}` : `day` } >
                    <p></p>
                </div> )
}
                })

                this.listaCss[kcs].css.push( {  
                                              estado: vcss.SUB_ESTADO, 
                                              css: vcss.CODIGO_SUBSERVICIO, 
                                              cs: vcss.SUB_CODIGO_SERVICIO, 
                                              inicio: vcss.SUB_FECHA_INICIO.substring(0,10), 
                                              entrega: vcss.SUB_FECHA_ENTREGA.substring(0,10),
                                              dia: cssdia  } )

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

          let cpmax = null
          let cpmin = null
          let cpdia = []

          _.forEach(y.np, (vnp, knp) => {
            this.obj.proyectos[knp] = { np: vnp, cp: [], show: false, ingreso: null, entrega: null, estado: null, ingresod: null, entregad: null, dia: [] } 
                     
            min[0] = []
            max[0] = []
            i = 0
            ok = 0
            mintime = null
            maxtime = null

            _.forEach(y.cp, (vcp, kcp) => {
              if (vcp.np == vnp) {

            cpmax = null
            cpmin = null
            cpdia = []



  cpmin = (moment(moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD')).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD').format('D') : 'antes' )
  cpmax = (moment(moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD')).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD').format('D') : 'despues' )
                _.times(this.obj.calendario.dia, (x) => {
                            //console.log(this.props.obj.np, this.props.obj.ingresod, this.props.obj.entregad  )

if ( cpmin == 'despues' || cpmax == 'antes' ) {
        cpdia.push( <div 
                       key={`${vcp.cp}${x}${vcp.np}`} 
                       class={`day`} >
                    <p></p>
                </div> )
}else if( cpmin == 'antes' ){
        cpdia.push( <div 
                        key={`${vcp.cp}${x}${vcp.np}`} 
                        class={ ( ++x <= cpmax  ) ? `day ok proyecto` : `day` } >
                    <p></p>
                </div> )
}else if( cpmax == 'despues' ){
        cpdia.push( <div 
                        key={`${vcp.cp}${x}${vcp.np}`} 
                        class={ ( ++x >= cpmin ) ? `day ok proyecto` : `day` } >
                    <p></p>
                </div> )
}else{
        cpdia.push( <div 
                        key={`${vcp.cp}${x}${vcp.np}`} 
                        class={ ( ++x >= cpmin && x++ <= cpmax  ) ? `day ok proyecto` : `day` } >
                    <p></p>
                </div> )
}


                })

                this.obj.proyectos[knp].cp.push({
                                                    np: vcp.np, 
                                                    cp: vcp.cp, 
                                                    cs: [], 
                                                    show: false,
                                                    ingreso: vcp.ingreso.substring(0,10),
                                                    entrega: vcp.entrega.substring(0,10),
                                                    estado: null,
                                                    dia: cpdia
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

/*
                if (moment(mintime).isSame('2016-12-09', 'month')) {
                  console.log( mintime.format('YYYY-MM-DD'), mintime.format('D'), '2016-12-09'   )
                }
                if (moment(maxtime).isSame('2016-12-09', 'month')) {
                  console.log( maxtime.format('YYYY-MM-DD'), maxtime.format('D'), '2016-12-09'   )
                }
*/

            this.obj.proyectos[knp].estado = ~~( ( ok * 100 ) / i )
            this.obj.proyectos[knp].ingreso = mintime.format('YYYY-MM-DD')
            this.obj.proyectos[knp].entrega = maxtime.format('YYYY-MM-DD')


            this.obj.proyectos[knp].ingresod = (moment(mintime).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(mintime).isSame(this.obj.calendario.now, 'month')) ? mintime.format('D') : 'antes' )
            this.obj.proyectos[knp].entregad = (moment(maxtime).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(maxtime).isSame(this.obj.calendario.now, 'month')) ? maxtime.format('D') : 'despues' )


                _.times(this.obj.calendario.dia, (i) => {
                    if ( this.obj.proyectos[knp].ingresod == 'despues' || this.obj.proyectos[knp].entregad == 'antes' ) {
                            this.obj.proyectos[knp].dia.push( <div key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} class={`day`} >
                                        <p></p>
                                    </div> )
                    }else if( this.obj.proyectos[knp].ingresod == 'antes' ){
                            this.obj.proyectos[knp].dia.push( <div key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} class={ ( ++i <= this.obj.proyectos[knp].entregad  ) ? `day ok` : `day` } >
                                        <p></p>
                                    </div> )
                    }else if( this.obj.proyectos[knp].entregad == 'despues' ){
                            this.obj.proyectos[knp].dia.push( <div key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} class={ ( ++i >= this.obj.proyectos[knp].ingresod ) ? `day ok` : `day` } >
                                        <p></p>
                                    </div> )
                    }else{
                            this.obj.proyectos[knp].dia.push( <div key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} class={ ( ++i >= this.obj.proyectos[knp].ingresod && i++ <= this.obj.proyectos[knp].entregad  ) ? `day ok` : `day` } >
                                        <p></p>
                                    </div> )
                    }
                })
            
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