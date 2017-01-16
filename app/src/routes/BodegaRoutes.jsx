import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import BodegaActions from '../actions/BodegaActions'
import BodegaStore from '../stores/BodegaStore'

import Bodega from '../components/bodega'

@ReactMixin.decorate(Reflux.connect(BodegaStore, 'obj'))
export default class BodegaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    BodegaActions.renderReset()
  	BodegaActions.renderBodega()
  }
  renderViewMore(){
    BodegaActions.renderViewMore()
  }
  renderFiltro(){
    BodegaActions.renderFiltro()
  }

  render() {
    if(this.state.obj){
    	return (
          <Bodega 
            obj={this.state.obj}
            renderFiltro={this.renderFiltro.bind(this)} 
            renderViewMore={this.renderViewMore.bind(this)}
          />
    	)
    }else{
      return (
          <div><h1>Cargando</h1></div>
      )
    }
  }

}
