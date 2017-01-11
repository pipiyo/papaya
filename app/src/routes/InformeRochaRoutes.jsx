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
    InformeRochaActions.allRocha()
  }
  render() {  
      if(this.state.obj){
        return (
          <div>
            <InformeRochaIndex obj={this.state.obj} />  
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
