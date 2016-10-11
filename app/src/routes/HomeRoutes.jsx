import React from 'react'

import Home from '../components/home'

export default class HomeRoutes extends React.Component {

  constructor() {
    super()

  }

  render() {
  	  return (
            <Home content={this.props.children}/>
      )
  }

}