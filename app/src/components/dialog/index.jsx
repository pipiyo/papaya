import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class DialogIndex extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (         
      <div>
          <div className="module_dialog ok">
            <div class="content-dialog">
              <a onClick={this.props.closeDialog} href="#" className="close"> <i class="fa fa-times-circle" aria-hidden="true"></i> </a>
              <div class="icon"> <i class="fa fa-gavel" aria-hidden="true"></i>  </div>
              <div class="text"> 
                <h5>{this.props.mensaje.title} </h5>
                <p>{this.props.mensaje.texto}</p> 
              </div>
            </div>
          </div>
      </div>
      )
  }

}

export default DialogIndex