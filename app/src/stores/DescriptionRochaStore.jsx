import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import DescriptionRochaActions from '../actions/DescriptionRochaActions'
import Env from '../Config'
import io from 'socket.io-client'


const socket = io.connect( `${Env.url}descriptionRocha` )

let DescriptionRochaStore = Reflux.createStore({
  listenables: [DescriptionRochaActions],
  obj: { 
    renderRocha: '',
    renderServicio: '',
    renderOC: '',
    renderVale: '',
    filtro:{ servicio:{estado:"En Proceso", categoria:null}, oc:{estado:null}, vale:{estado:null} }
  },
  renderRocha: function(id){
  	socket.emit('allRocha',id,this.obj.filtro, (n) => {
         this.obj.renderRocha = n.rocha
         this.obj.renderServicio = n.servicio
         this.obj.renderOC = n.oc
         this.obj.renderVale = n.vale
         this.trigger(this.obj)
    })
  },
  renderFilter : function(id){
    let estadoServicio = document.getElementById("estado-servicio").value
    let categoriaServicio = document.getElementById("categoria-servicio").value
    let estadoOC = document.getElementById("estado-oc").value
    let estadoVale = document.getElementById("estado-vale").value

    if(estadoServicio != ""){this.obj.filtro.servicio.estado=estadoServicio}else{this.obj.filtro.servicio.estado=estadoServicio}
    if(categoriaServicio != ""){this.obj.filtro.servicio.categoria=categoriaServicio}else{this.obj.filtro.servicio.categoria= null}   
    if(estadoOC != ""){this.obj.filtro.oc.estado = estadoOC}else{this.obj.filtro.oc.estado = null}
    if(estadoVale != ""){this.obj.filtro.vale.estado =  estadoVale }else{this.obj.filtro.vale.estado = null}

    socket.emit('allRocha',id,this.obj.filtro, (n) => {
         this.obj.renderRocha = n.rocha
         this.obj.renderServicio = n.servicio
         this.obj.renderOC = n.oc
         this.obj.renderVale = n.vale
         this.trigger(this.obj)
    })
  }
})

export default DescriptionRochaStore