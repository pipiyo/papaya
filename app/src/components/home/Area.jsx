import React from 'react'
import { Link } from 'react-router'

class Area extends React.Component {

  constructor() {
    super()
  }

  render() {
      return (
            <li data-active={this.props.num}>
              <a href="#" data-click={this.props.num} onClick={this.props.click} >
                <div className={this.props.icon}>
                 {this.props.img}
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