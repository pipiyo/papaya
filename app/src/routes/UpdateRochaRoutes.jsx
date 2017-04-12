import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import UpdateRochaActions from '../actions/UpdateRochaActions'
import UpdateRochaStore from '../stores/UpdateRochaStore'

import UpdateRochaIndex from '../components/update-rocha'


@ReactMixin.decorate(Reflux.connect(UpdateRochaStore, 'obj'))
export default class UpdateRochaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    UpdateRochaActions.searchRocha(this.props.params.id);
  }
  componentWillReceiveProps(nextProps, nextState){
    UpdateRochaActions.searchRocha(nextProps.params.id);
  }
  updateRocha(event) {
    event.preventDefault()
    event.persist()
    UpdateRochaActions.updateRocha(event);
  }
  renderTotal() {
    UpdateRochaActions.renderTotal();
  }
  renderFechaInicio(date){
    UpdateRochaActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    UpdateRochaActions.renderFechaEntrega(date)
  }
  renderFechaActa(date){
    UpdateRochaActions.renderFechaActa(date)
  }
  renderFechaConfirmacion(date){
    UpdateRochaActions.renderFechaConfirmacion(date)
  }
  render() {
      if(this.state.obj){
      return (
        <UpdateRochaIndex
        obj={this.state.obj}
        updateRocha={this.updateRocha.bind(this)}
        renderTotal={this.renderTotal.bind(this)}
        renderFechaInicio={this.renderFechaInicio.bind(this)} 
        renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
        renderFechaConfirmacion={this.renderFechaConfirmacion.bind(this)} 
        renderFechaActa={this.renderFechaActa.bind(this)}  
        />       
      )
    }else{
      return (
        <div> <h1> Cargando </h1></div>     
      )
    }
  }

}


