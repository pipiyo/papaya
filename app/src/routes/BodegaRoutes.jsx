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
  	 BodegaActions.renderBodega();
  }
  renderViewMore(){
    BodegaActions.renderViewMore();
  }

  render() {
    if(this.state.obj){
    	return (
          <Bodega 
            bodega={this.state.obj.renderItem} 
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
