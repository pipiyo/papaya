import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ClonerRochaActions from '../actions/ClonerRochaActions'
import ClonerRochaStore from '../stores/ClonerRochaStore'

import UpdateRochaIndex from '../components/cloner-rocha'


@ReactMixin.decorate(Reflux.connect(ClonerRochaStore, 'obj'))
export default class UpdateRochaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    ClonerRochaActions.searchRocha(this.props.params.id);
  }
  componentWillReceiveProps(nextProps, nextState){
    ClonerRochaActions.searchRocha(nextProps.params.id);
  }
  clonerRocha(event) {
    event.preventDefault()
    event.persist()
    ClonerRochaActions.clonerRocha(event);
  }
  renderTotal(){
    ClonerRochaActions.renderTotal();
  }
  renderFechaInicio(date){
    ClonerRochaActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    ClonerRochaActions.renderFechaEntrega(date)
  }
  render() {
      if(this.state.obj){
      return (
        <UpdateRochaIndex
        obj={this.state.obj}
        scrollWin={this.props.scrollWin}
        clonerRocha={this.clonerRocha.bind(this)}
        renderTotal={this.renderTotal.bind(this)}
        renderFechaInicio={this.renderFechaInicio.bind(this)} 
        renderFechaEntrega={this.renderFechaEntrega.bind(this)} 
        />       
      )
    }else{
      return (
        <div> <h1> Cargando </h1></div>     
      )
    }
  }

}


