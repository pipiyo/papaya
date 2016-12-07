import React from 'react'

import Home from '../components/home'

//@ReactMixin.decorate(Reflux.connect(AuthStore, 'user'))
export default class HomeRoutes extends React.Component {



  constructor() {
    super()
   //  console.log( window.location.hash.substr(0) )
	  // console.log( window.location.hash.substr(1) )
	  // console.log( window.location.hash.substr(2) )
  }


  render() {

      return (
            <Home content={this.props.children}/>
      )

  }

}