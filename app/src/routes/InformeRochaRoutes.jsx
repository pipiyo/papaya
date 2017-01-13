import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import DatePicker from 'react-datepicker'
import moment  from 'moment'

import InformeRochaActions from '../actions/InformeRochaActions'
import InformeRochaStore from '../stores/InformeRochaStore'

import InformeRochaIndex from '../components/informe-rocha'

@ReactMixin.decorate(Reflux.connect(InformeRochaStore, 'obj'))
export default class InformeRoutes extends React.Component {

  constructor() {
    super()
  }
  componentWillMount(){
    InformeRochaActions.renderReset()
    InformeRochaActions.allRocha()
  }
  renderFiltro(){
    InformeRochaActions.renderFiltro()
  }
  renderFiltroFi(date){
    InformeRochaActions.renderFiltroFi(date)
  }
  renderFiltroFe(date){
    InformeRochaActions.renderFiltroFe(date)
  }
  renderViewMore(){
    InformeRochaActions.renderViewMore()
  }
  render() {  
      if(this.state.obj){
        return (
          <div>
            <InformeRochaIndex
            renderFiltro={this.renderFiltro.bind(this)}
            renderFiltroFi={this.renderFiltroFi.bind(this)}
            renderFiltroFe={this.renderFiltroFe.bind(this)}
            renderViewMore={this.renderViewMore.bind(this)} 
            obj={this.state.obj} 
            />  
          </div>  
        )
      }else{
        return (
          <div>
            <h1>Cargando</h1>
          </div>
        )
      }
  }

}
