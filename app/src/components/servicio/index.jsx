import React from 'react'

import Title from './Title'
import Form from './Form'
import Dialog from '../dialog/index.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class ServicioIndex extends React.Component {

  constructor() {
    super()
  }
  render() {
      return (
        <div>
            <Title mensaje={this.props.mensaje} />
            <Form
            fecha={this.props.fecha} 
            rocha={this.props.rocha} 
            reclamo={this.props.reclamo}
            tipo={this.props.tipo} 
            addServicio={this.props.addServicio} 
            area={this.props.area} 
            renderArea={this.props.renderArea} 
            />
            <ReactCSSTransitionGroup 
              transitionName = "dialog"
              transitionAppear = {false} 
              transitionEnter = {true}
              transitionEnterTimeout = {1500}
              transitionLeave = {true}
              transitionLeaveTimeout={500}
              >
              {(this.props.mensaje.estado)?<Dialog closeDialog={this.props.closeDialog} mensaje={this.props.mensaje} />:null}
            </ReactCSSTransitionGroup>
        </div>   
      )

  }

}

export default ServicioIndex