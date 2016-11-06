import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import InformeActions from '../actions/InformeActions'
import InformeStore from '../stores/InformeStore'

import InformeIndex from '../components/informe'

@ReactMixin.decorate(Reflux.connect(InformeStore, 'data'))
export default class InformeRoutes extends React.Component {

  constructor() {
    super()
    this.state = {view:20, sum:40}
  }
  componentWillMount(){
    this.setState({sum:40})
  	InformeActions.viewInformes(this.props.params.area,this.state.view);
  }
  componentWillReceiveProps(nextProps, nextState){
     this.setState({sum:40})
    InformeActions.viewInformes(nextProps.params.area,this.state.view);
  }
  viewMore(){
    this.setState({sum:this.state.view + this.state.sum})
    InformeActions.viewInformes(this.props.params.area,this.state.sum);
  }

  render() {
    if(this.state.data){
      return (
        <div>
          <InformeIndex servicio={this.props.params.area} datos={this.state.data} viewMore={this.viewMore.bind(this)} />  
        </div>  
      )
    }else{
      return (
      <div><h1>Cargando ...</h1></div>
      )
    }
  }

}
