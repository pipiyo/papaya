import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DialogActions from '../actions/DialogActions'
import DialogStore from '../stores/DialogStore'

import DialogIndex from '../components/dialog'

@ReactMixin.decorate(Reflux.connect(DialogStore, 'obj'))
export default class InformeRoutes extends React.Component {

  constructor() {
    super()
  }
  closeDialog(event) {
    event.preventDefault()
    DialogActions.closeDialog() 
  }
  render() {  
    return (
      <div>
        <ReactCSSTransitionGroup 
              transitionName = "dialog"
              transitionAppear = {false} 
              transitionEnter = {true}
              transitionEnterTimeout = {1500}
              transitionLeave = {true}
              transitionLeaveTimeout={1500}
        >
          {(this.state.obj.mensaje.estado)?<DialogIndex closeDialog={this.closeDialog.bind(this)}  mensaje={this.state.obj.mensaje} />:null} 
        </ReactCSSTransitionGroup>  
      </div>  
    )
  }

}
