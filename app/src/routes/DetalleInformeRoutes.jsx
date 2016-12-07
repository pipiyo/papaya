import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DetalleInformeActions from '../actions/DetalleInformeActions'
import DetalleInformeStore from '../stores/DetalleInformeStore'

import DetalleInforme from '../components/detalle-informe'

@ReactMixin.decorate(Reflux.connect(DetalleInformeStore, 'obj'))
export default class DetalleInformeRoutes extends React.Component {
  constructor() {
    super()
  }
  componentWillMount(){
  	DetalleInformeActions.allSubServicio(this.props.params.id)
  }
  componentWillUpdate(nextProps,nextState){
    if(this.state.obj.renderSubServicio !== nextState.obj.renderSubServicio)
      {DetalleInformeActions.allSubServicio(nextProps.params.id)
    }
  }
  render() {
    if(this.state.obj.subServicio){
      return (
        <DetalleInforme 
        renderSubServicio={this.state.obj.renderSubServicio}
        renderServicio={this.state.obj.renderServicio}
        sub={this.state.obj.renderSubServicio}
        datos={this.state.obj.subServicio} 
        />       
      )
    }else{
      return (
        <div><h1>Cargando</h1></div>      
      )
    }
  }

}
