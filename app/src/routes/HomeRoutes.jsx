import React from 'react'
import ReactMixin from 'react-mixin'
import Reflux from 'reflux'

import Home from '../components/home'

import HomeActions from '../actions/HomeActions'

import { browserHistory } from 'react-router'

import HomeStore from '../stores/HomeStore'

import AuthStore from '../stores/AuthStore'

import AuthActions from '../actions/AuthActions'

//@ReactMixin.decorate(Reflux.connect(AuthStore, 'user'))
export default class HomeRoutes extends React.Component {


  constructor() {
    super()
   //  console.log( window.location.hash.substr(0) )
	  // console.log( window.location.hash.substr(1) )
	  // console.log( window.location.hash.substr(2) )
  }


  componentWillMount(){
     //HomeActions.checkLogin()
    
/*
    if (!AuthStore.name) {
      browserHistory.push('/')
    }
*/

     console.log( 'componentWillMount' )
  }

  componentWillReceiveProps(){
    /*
    if (!this.state.var) {
      browserHistory.push('/')
    }
    */
    //AuthActions.getUser()

    //AuthActions.getUser()

    console.log( 'componentWillReceiveProps' )
  }

  shouldComponentUpdate(){



    console.log( 'shouldComponentUpdate' )
    return true
  }

  componentWillUpdate(){


    console.log( 'componentWillUpdate' )
  }


  componentDidUpdate(){


    console.log( 'componentDidUpdate' )
  }


  render() {

      return (
            <Home content={this.props.children}/>
      )

  }

}