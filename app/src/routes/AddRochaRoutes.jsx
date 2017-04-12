import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import AddRochaActions from '../actions/AddRochaActions'
import AddRochaStore from '../stores/AddRochaStore'

import AddRochaIndex from '../components/add-rocha'


@ReactMixin.decorate(Reflux.connect(AddRochaStore, 'obj'))
export default class AddRochaRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    AddRochaActions.completSelect()
  }
  addRocha(event) {
    event.preventDefault()
    event.persist()
    AddRochaActions.addRocha(event);
  }
  renderTotal() {
    AddRochaActions.renderTotal();
  }
  renderFechaInicio(date){
    AddRochaActions.renderFechaInicio(date)
  }
  renderFechaEntrega(date){
    AddRochaActions.renderFechaEntrega(date)
  }
  
  render() {
      if(this.state.obj){
      return (
        <AddRochaIndex
        obj={this.state.obj}
        addRocha={this.addRocha.bind(this)}
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


