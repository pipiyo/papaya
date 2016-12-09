import React from 'react'
import { Link } from 'react-router'

class Area extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
            <li data-active={this.props.num}>
              <a href="#" data-click={this.props.num} onClick={this.props.submenu} >
                <div className={this.props.icon}>
                  <i className={this.props.img} aria-hidden="true"></i>    
                </div>
                <p>{this.props.name}</p>
               </a>
              <ul>
                {this.props.sub}
              </ul>
            </li>
      )
  }

}

export default Area