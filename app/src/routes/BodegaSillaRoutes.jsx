import React, { Component } from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import BodegaSillaActions from '../actions/BodegaSillaActions'
import BodegaSillaStore from '../stores/BodegaSillaStore'

import BodegaSilla from '../components/bodega-silla'

@ReactMixin.decorate(Reflux.connect(BodegaSillaStore, 'obj'))
export default class BodegaSillaRoutes extends Component {

  constructor() {
    super()
  }

  componentWillMount(){
    BodegaSillaActions.renderBodegaSilla()
  }



  render() {
    if(this.state.obj){
    	return (
          <BodegaSilla 
            obj={this.state.obj}
          />
    	)
    }else{
      return (
          <div><h1>Cargando</h1></div>
      )
    }
  }

}


