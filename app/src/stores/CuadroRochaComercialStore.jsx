import React from 'react'

import Reflux from 'reflux'

import _ from 'lodash'
import moment from 'moment'
moment.locale('es')

import CuadroRochaComercialActions from '../actions/CuadroRochaComercialActions'

import Env from '../Config'
import io from 'socket.io-client'
const socket = io.connect( `${Env.url}cuadroRochaComercial` )

let CuadroRochaComercialStore = Reflux.createStore({
  listenables: [CuadroRochaComercialActions],

  obj: {
    proyectos: [],
    showProyecto: null,
    showRocha: null,
    showServicio: null,
    showSubServicio: null,
    selected: null,
    vista: 50,
    form: {
          ejecutivo: [],
          cliente: [],
          busqueda: {
                      rocha: null,
                      proyecto: null,
                      ejecutivo: null,
                      cliente: null,
                      estado: null,
                      vermas: 0
                    }, 
    },
    buscar: null,
    calendario: { 
                  mes: [],
                  dia: null,
                  dias: [],
                  diasproyecto: [],
                  diaspintar: [],
                  sumar: 0,
                  restar: 0,
                  subirmes: null,
                  bajarmes: null,
                  now:null,
                  last: null,
                  first: null
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

/*
 let f = {
                               rocha: null,
                               proyecto: null,
                               ejecutivo: localStorage.getItem('full_name'),
                               cliente: null,
                               estado: null,
                               vermas: 0
                             }
*/

    this.obj.form.busqueda = {
                               rocha: null,
                               proyecto: null,
                               ejecutivo: localStorage.getItem('full_name'),
                               cliente: null,
                               estado: null,
                               vermas: 0
                             }



    this.getProyectos('getRochas', null, null, null)


  },

  getInitialState: function() {

    this.getObj()

    return this.obj

  },

  showProyecto: function(e){
    CuadroRochaComercialActions._showProyecto(e.target.textContent,e.currentTarget)
  },
  _showProyecto: function(e, i){
    let index = _.findIndex(this.obj.proyectos, { np: `${e}` })
    this.obj.proyectos[index].show = this.obj.proyectos[index].show ? false : true 
  



     _.forEach(this.obj.proyectos[index].cp, (value, key) => {
        this.obj.proyectos[index].cp[key].dia = []
            _.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
              if (moment(dpv.fecha).isBetween(value.ingreso, value.entrega, 'day')) {
                    this.obj.proyectos[index].cp[key].dia.push( <div 
                                    key={`${value.cp}${dpk}${value.np}`} 
                                    class={ `day ok proyecto` } >
                                <p></p>
                            </div> )
                }else{
                    this.obj.proyectos[index].cp[key].dia.push( <div 
                                                  key={`${value.cp}${dpk}${value.np}`} 
                                                  class={ `day` } >
                                              <p></p>
                                          </div> )
                }
            })
     })

/*
_.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
  if (moment(dpv.fecha).isBetween(value.ingreso, value.entrega, 'day')) {
        this.obj.proyectos[index].cp[key].dia.push( <div 
                        key={`${value.cp}${dpk}${value.np}`} 
                        class={ `day ok proyecto` } >
                    <p></p>
                </div> )
    }else{
        this.obj.proyectos[index].cp[key].dia.push( <div 
                                      key={`${value.cp}${dpk}${value.np}`} 
                                      class={ `day` } >
                                  <p></p>
                              </div> )
    }
})

                this.obj.proyectos[index].cp[key].dia.push

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
*/





    /* Opacity */
    if(this.obj.proyectos[index].show){
      this.obj.selected = i.getAttribute('data-npok')
    }else{
      this.obj.selected = null
    }
    this.trigger( this.obj )
  },


  showRocha: function(e){
    CuadroRochaComercialActions._showRocha(e.target,e.currentTarget)
  },
  _showRocha: function(e,i){
    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  rocha: e.getAttribute('data-indexrocha'),
                }


     _.forEach(this.obj.proyectos[index.proyecto].cp[index.rocha].cs, (value, key) => {
        this.obj.proyectos[index.proyecto].cp[index.rocha].cs[key].dia = []
        _.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
            if (moment(dpv.fecha).isBetween(value.inicio, value.entrega, 'day')) {
              this.obj.proyectos[index.proyecto].cp[index.rocha].cs[key].dia.push( <div 
                                key={`${value.csnombre}${dpk}${value.cs}`} 
                                class={ `day ok ${value.nombre.toLowerCase()}` } >
                            <p></p>
                        </div> )
            }else{
              this.obj.proyectos[index.proyecto].cp[index.rocha].cs[key].dia.push( <div 
                                key={`${value.csnombre}${dpk}${value.cs}`} 
                                class={ `day` } >
                            <p></p>
                        </div> )
            }
        })
     })



    this.obj.proyectos[index.proyecto].cp[index.rocha].show = this.obj.proyectos[index.proyecto].cp[index.rocha].show ? false : true 
    this.obj.selected = i.getAttribute('data-npok')
    this.trigger( this.obj )
  },


  showServicio: function(e){
    CuadroRochaComercialActions._showServicio(e.target,e.currentTarget)
  },
  _showServicio: function(e,i){

    let index = { 
                  proyecto: e.getAttribute('data-indexproyecto'),
                  servicio: e.getAttribute('data-indexservicio'),
                  rocha: e.getAttribute('data-indexrocha')
                }

     _.forEach(this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].css, (value, key) => {
        this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].css[key].dia = []
        _.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
            if (moment(dpv.fecha).isBetween(value.inicio, value.entrega, 'day')) {
              this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].css[key].dia.push( <div 
                                key={`${value.cs}${dpk}${value.cs}`} 
                                class={ `day ok ${value.nombre.toLowerCase()}` } >
                            <p></p>
                        </div> )
            }else{
               this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].css[key].dia.push( <div 
                                key={`${value.cs}${dpk}${value.cs}`} 
                                class={ `day` } >
                            <p></p>
                        </div> )
            }
        })
     })

    this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show = this.obj.proyectos[index.proyecto].cp[index.rocha].cs[index.servicio].show ? false : true 
    this.obj.selected = i.getAttribute('data-npok')
    this.trigger( this.obj )
  },




  showSubServicio: function(e){
    CuadroRochaComercialActions._showSubServicio(e.target,e.currentTarget)
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
    CuadroRochaComercialActions._buscar(e.target)
  },

  _buscar: function(e) {


    this.getProyectos('getRochaFiltro', e, 'stay', null)


  },  




  subirmes: function() {
    CuadroRochaComercialActions._subirmes()
  },  
  _subirmes: function() {

    this.getProyectos('getRochas', null, 'add', null)
    //this.obj.calendario.sumar = this.obj.calendario.sumar + 1
    //this.obj.calendario.restar = this.obj.calendario.sumar - 1

  },  

  bajarmes: function() {
    CuadroRochaComercialActions._bajarmes()
  },  
  _bajarmes: function() {

    this.getProyectos('getRochas', null, 'subtract', null)
    //this.obj.calendario.sumar = this.obj.calendario.sumar - 1
    //this.obj.calendario.restar = this.obj.calendario.sumar + 1

  },

  vermas: function() {
    CuadroRochaComercialActions._vermas()
  },  
  _vermas: function() {

    this.getProyectos('getRochas', null, 'stay', 'vermas')
  },

  getProyectos: function(method, event, operator, vermas) {

//console.log( moment().daysInMonth() )

/*
    _.forEach(moment.months(2), (value, key) => {
      this.obj.calendario[key] = value
    })
*/

  if ( operator == 'add' ) {

    //this.obj.calendario.now = this.obj.calendario.now.add(1, 'months')
    this.obj.calendario.last = this.obj.calendario.last.add(1, 'months')
    


  }else if( operator == 'subtract' ) {

    //this.obj.calendario.now = this.obj.calendario.now.subtract(1, 'months')
    this.obj.calendario.first = this.obj.calendario.first.subtract(1, 'months')

  }else if( operator == 'stay' ){



  }else{
    //this.obj.calendario.now = moment()
    this.obj.calendario.first = moment().subtract(1, 'months')
    this.obj.calendario.last = moment().add(2, 'months')
  }


      //console.log( this.obj.calendario.first.month(), this.obj.calendario.last.month() )



      //console.log( this.obj.calendario.last.diff(this.obj.calendario.first, 'months' ) )

      //this.obj.calendario.now = moment()

this.obj.calendario.dias = []
this.obj.calendario.diaspintar = []
this.obj.calendario.mes = []

                let first = null
                let last = null
                let diff = this.obj.calendario.last.diff(this.obj.calendario.first, 'months' )

     _.times( this.obj.calendario.first.daysInMonth(), (iii) => {
                this.obj.calendario.dias.push( <div key={`${iii}day${0}`} class="day">
                                                   <p>{iii+1}</p>
                                               </div>  )
         this.obj.calendario.diaspintar.push({
                                             fecha: moment(`${this.obj.calendario.first.clone().year()}-${this.obj.calendario.first.clone().month()+1}-${iii+1}`, 'YYYY-MM-DD') 
                                           })
         //console.log( moment(`${this.obj.calendario.first.clone().year()}-${this.obj.calendario.first.clone().month()+1}-${iii+1}`, 'YYYY-MM-DD')  )
     })
            this.obj.calendario.mes.push(<div 
                                             key={`${0}mes`} 
                                             class={ `mes mes${this.obj.calendario.first.clone().daysInMonth()}` }> <p> {`${moment.months(this.obj.calendario.first.clone().month())}`} </p> </div>)

for ( let loop = 1; loop <= diff; loop++ ) {

            this.obj.calendario.mes.push(<div 
                  key={`${loop}mes`} 
                  class={ `mes mes${this.obj.calendario.first.clone().add(loop, 'months').daysInMonth()}` }> <p> {`${moment.months(this.obj.calendario.first.clone().add(loop, 'months').month())}`} </p> </div>)

                _.times( this.obj.calendario.first.clone().add(loop, 'months').daysInMonth(), (ii) => {
                           this.obj.calendario.dias.push( <div key={`${ii+1}day${loop}`} class="day">
                                                              <p>{ii+1}</p>
                                                          </div>  )
                    this.obj.calendario.diaspintar.push({
                                                        fecha: moment(`${this.obj.calendario.first.clone().add(loop, 'months').year()}-${this.obj.calendario.first.clone().add(loop, 'months').month()+1}-${ii+1}`, 'YYYY-MM-DD') 
                                                      })
                })

}


//console.log( this.obj.calendario.diaspintar )




/*
          _.forEach(moment.months(), (value, key) => {
            if ( key >= this.obj.calendario.first.month() && key <= this.obj.calendario.last.month() ) {
                _.times( moment().month(key).daysInMonth(), (i) => {
                           this.obj.calendario.dias.push( <div key={`${i}day${value}${key}`} class="day">
                                                              <p>{i+1}</p>
                                                          </div>  )



            this.obj.calendario.diaspintar.push({
                                                        año: moment().year(),
                                                        mes: key+1,
                                                        dia: i+1,
                                                        fecha: moment(`${moment().year()}-${key+1}-${i+1}`, 'YYYY-MM-DD')
                                                      })



                })
                       this.obj.calendario.mes.push(<div 
                                                        key={`${key}mes`} 
                                                        class={ `mes mes${moment().month(key).daysInMonth()}` }> <p> {`${value}`} </p> </div>)
            }
          })
*/





      //this.obj.calendario.mes = moment.months(this.obj.calendario.now.month())
      this.obj.calendario.dia = moment().daysInMonth()      
      this.obj.calendario.numeromes = moment().month()


      this.obj.calendario.subirmes = this.subirmes
      this.obj.calendario.bajarmes =this.bajarmes

      this.obj.showProyecto = this.showProyecto
      this.obj.showRocha = this.showRocha
      this.obj.showServicio = this.showServicio
      this.obj.showSubServicio = this.showSubServicio
      this.obj.buscar = this.buscar
      this.obj.destacado = this.destacado
      this.obj.selected = null
      this.obj.vermas = this.vermas

if (event) {

    this.obj.form.busqueda = null

    this.obj.form.busqueda = {
                               rocha: event.elements[0].value,
                               proyecto: event.elements[1].value,
                               ejecutivo: event.elements[2].value,
                               cliente: event.elements[3].value,
                               estado: event.elements[4].value,
                               vermas: 0
                             }

}


  this.obj.form.busqueda.vermas = (vermas) ? ( this.obj.form.busqueda.vermas + this.obj.vista )  : this.obj.form.busqueda.vermas

  this.obj.proyectos= []

    socket.emit(method, this.obj.form.busqueda, ( y ) => {

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

/*
csmin = (moment(moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD')).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD').format('D') : 'antes' )
csmax = (moment(moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD')).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD').format('D') : 'despues' )

                _.times(this.obj.calendario.dia, (r) => {
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
*/
/*
_.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
    if (moment(dpv.fecha).isBetween(moment(vcs.inicio.substring(0,10), 'YYYY-MM-DD'), moment(vcs.entrega.substring(0,10), 'YYYY-MM-DD'), 'day')) {
        csdia.push( <div 
                        key={`${vcs.csnombre}${dpk}${vcs.cs}`} 
                        class={ `day ok ${vcs.nombre.toLowerCase()}` } >
                    <p></p>
                </div> )
    }else{
                csdia.push( <div 
                        key={`${vcs.csnombre}${dpk}${vcs.cs}`} 
                        class={ `day` } >
                    <p></p>
                </div> )
    }
})
*/

            this.listaCss[kcs] = {  
                                  estado: null, 
                                  csnombre: vcs.csnombre, 
                                  nombre: vcs.nombre,
                                  cs: vcs.cs, 
                                  cp: vcs.cp, 
                                  inicio: vcs.inicio.substring(0,10), 
                                  entrega: vcs.entrega.substring(0,10), 
                                  css: [], 
                                  show: false,
                                  descripcion: vcs.descripcion,
                                  dia: csdia }
            

            i = 0
            ok = 0

            _.forEach(y.css, (vcss, kcss) => {
              if (vcss.SUB_CODIGO_SERVICIO == vcs.cs) {

            cssmax = null
            cssmin = null
            cssdia = []

/*
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
*/
/*
_.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
    if (moment(dpv.fecha).isBetween(moment(vcss.SUB_FECHA_INICIO.substring(0,10), 'YYYY-MM-DD'), moment(vcss.SUB_FECHA_ENTREGA.substring(0,10), 'YYYY-MM-DD'), 'day')) {
                cssdia.push( <div 
                        key={`${vcss.CODIGO_SUBSERVICIO}${dpk}${vcss.SUB_CODIGO_SERVICIO}`} 
                        class={ `day` } >
                    <p></p>
                </div> )
    }else{
                cssdia.push( <div 
                        key={`${vcss.CODIGO_SUBSERVICIO}${dpk}${vcss.SUB_CODIGO_SERVICIO}`} 
                        class={ `day ok ${vcss.nombre.toLowerCase()}` } >
                    <p></p>
                </div> )
    }
})
*/
                this.listaCss[kcs].css.push( {  
                                              estado: vcss.SUB_ESTADO, 
                                              nombre: vcss.nombre,
                                              css: vcss.CODIGO_SUBSERVICIO, 
                                              cs: vcss.SUB_CODIGO_SERVICIO, 
                                              inicio: vcss.SUB_FECHA_INICIO.substring(0,10), 
                                              entrega: vcss.SUB_FECHA_ENTREGA.substring(0,10),
                                              descripcion: vcs.descripcion,
                                              dia: cssdia  } )

                  if (vcss.SUB_ESTADO == 'OK' || vcss.SUB_ESTADO == 'NULA') {
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
            this.obj.proyectos[knp] = { np: vnp, cp: [], show: false, ingreso: null, entrega: null, estado: null, ingresod: null, entregad: null, dia: [], cliente: null, ejecutivo: null } 
                     
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


/*
  cpmin = (moment(moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD')).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD').format('D') : 'antes' )
  cpmax = (moment(moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD')).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD')).isSame(this.obj.calendario.now, 'month')) ? moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD').format('D') : 'despues' )
                _.times(this.obj.calendario.dia, (x) => {

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
*/
/*
_.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
  if (moment(dpv.fecha).isBetween(moment(vcp.ingreso.substring(0,10), 'YYYY-MM-DD'), moment(vcp.entrega.substring(0,10), 'YYYY-MM-DD'), 'day')) {
        cpdia.push( <div 
                        key={`${vcp.cp}${dpk}${vcp.np}`} 
                        class={ `day ok proyecto` } >
                    <p></p>
                </div> )
    }else{
        cpdia.push( <div 
                        key={`${vcp.cp}${dpk}${vcp.np}`} 
                        class={ `day` } >
                    <p></p>
                </div> )
    }
})
*/
                this.obj.proyectos[knp].cp.push({
                                                    np: vcp.np, 
                                                    cp: vcp.cp, 
                                                    cs: [], 
                                                    show: false,
                                                    ingreso: vcp.ingreso.substring(0,10),
                                                    entrega: vcp.entrega.substring(0,10),
                                                    estado: null,
                                                    ejecutivo: vcp.ejecutivo,
                                                    cliente: vcp.cliente,
                                                    dia: cpdia
                                                })

                if (vcp.estado == 'OK' || vcp.estado == 'NULA') {
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
            this.obj.proyectos[knp].ejecutivo = this.obj.proyectos[knp].cp[0].ejecutivo
            this.obj.proyectos[knp].cliente = this.obj.proyectos[knp].cp[0].cliente
            this.obj.proyectos[knp].estado = ~~( ( ok * 100 ) / i )
            this.obj.proyectos[knp].ingreso = mintime.format('YYYY-MM-DD')
            this.obj.proyectos[knp].entrega = maxtime.format('YYYY-MM-DD')


//this.obj.proyectos[knp].ingresod = (moment(mintime).isAfter(this.obj.calendario.now, 'month')) ? 'despues' : ( (moment(mintime).isSame(this.obj.calendario.now, 'month')) ? mintime.format('D') : 'antes' )
//this.obj.proyectos[knp].entregad = (moment(maxtime).isBefore(this.obj.calendario.now, 'month')) ? 'antes' : ( (moment(maxtime).isSame(this.obj.calendario.now, 'month')) ? maxtime.format('D') : 'despues' )

/*
_.times(this.obj.calendario.dia, (i) => {
    if ( this.obj.proyectos[knp].ingresod == 'despues' || this.obj.proyectos[knp].entregad == 'antes' ) {
            this.obj.proyectos[knp].dia.push( <div 
                                                  key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} 
                                                  class={`day`} >
                        <p></p>
                    </div> )
    }else if( this.obj.proyectos[knp].ingresod == 'antes' ){
            this.obj.proyectos[knp].dia.push( <div 
                                                  key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} 
                                                  class={ ( ++i <= this.obj.proyectos[knp].entregad  ) ? `day ok` : `day` } >
                        <p></p>
                    </div> )
    }else if( this.obj.proyectos[knp].entregad == 'despues' ){
            this.obj.proyectos[knp].dia.push( <div 
                                                  key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} 
                                                  class={ ( ++i >= this.obj.proyectos[knp].ingresod ) ? `day ok` : `day` } >
                        <p></p>
                    </div> )
    }else{
            this.obj.proyectos[knp].dia.push( <div 
                                                key={`${this.obj.proyectos[knp].np}${i}${this.obj.proyectos[knp].ingreso}`} 
                                                class={ ( ++i >= this.obj.proyectos[knp].ingresod && i++ <= this.obj.proyectos[knp].entregad  ) ? `day ok` : `day` } >
                        <p></p>
                    </div> )
    }
})
*/
          _.forEach(this.obj.calendario.diaspintar, (dpv, dpk) => {
              if (moment(dpv.fecha).isBetween(mintime, maxtime, 'day')) {
                  this.obj.proyectos[knp].dia.push( <div 
                                                      key={`${this.obj.proyectos[knp].np}${dpk}${this.obj.proyectos[knp].ingreso}`} 
                                                      class={`day ok`} >
                              <p></p>
                          </div> )
              }else{
                          this.obj.proyectos[knp].dia.push( <div 
                                                      key={`${this.obj.proyectos[knp].np}${dpk}${this.obj.proyectos[knp].ingreso}`} 
                                                      class={`day`} >
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


                  if (vcs.estado == 'OK' || vcs.estado == 'NULA') {
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

export default CuadroRochaComercialStore