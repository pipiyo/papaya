import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import BodegaSonActions from '../actions/BodegaSonActions'
import BodegaSonStore from '../stores/BodegaSonStore'

import BodegaSon from '../components/bodega-son'

@ReactMixin.decorate(Reflux.connect(BodegaSonStore, 'obj'))
export default class BodegaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    BodegaSonActions.renderReset()
  	BodegaSonActions.renderBodega(this.props.params.id)
  }
  componentWillReceiveProps(nextProps){
    BodegaSonActions.renderReset()
    BodegaSonActions.renderBodega(nextProps.params.id)
  }
  renderViewMore(){
    BodegaSonActions.renderViewMore(this.props.params.id)
  }
  render() {
    if(this.state.obj){
    	return (
          <BodegaSon 
            obj={this.state.obj}
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
