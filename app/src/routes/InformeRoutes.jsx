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
    this.setState({view:20})
  	InformeActions.viewInformes(this.props.params.area,this.state.view);
  }
  componentWillReceiveProps(nextProps, nextState){
     this.setState({view:20})
    InformeActions.viewInformes(nextProps.params.area,this.state.view);
  }
  viewMore(){
    this.setState({sum:this.state.view + this.state.sum})
    console.log(this.state.view)
    InformeActions.viewInformes(this.props.params,this.state.sum);
  }

  render() {
    let i = 0;
    console.log("Nuevo Objetos")
    for (var valor in this.state.data){
        console.log(this.state.data[valor])
        i++;
    }
    
   
    if(this.state.data){
      return (
        <div>
          <InformeIndex />
          <button onClick={this.viewMore.bind(this)}> Ver Más</button>   
        </div>  
      )
    }else{
      return (
      <div><h1>Cargando ...</h1></div>
      )
    }
  }

}
