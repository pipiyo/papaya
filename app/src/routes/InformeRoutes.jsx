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
  }
  componentWillMount(){
  	InformeActions.viewInformes(this.props.params.area);
  }
  componentWillReceiveProps(nextProps){
    InformeActions.viewInformes(nextProps.params.area);
  }

  render() {
      return (
        <InformeIndex />       
      )
  }

}
