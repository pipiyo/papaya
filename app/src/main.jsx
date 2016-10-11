//require('../bundle/css/main.css')

import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'

import Home from './routes/HomeRoutes'

import { Router, Route, Link, browserHistory } from 'react-router'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/home" component={Home}>	
    	<Route path="/home/servicio" component={Servicio}/>  
    </Route>
  </Router>
), document.getElementById('app'))