import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'

import Home from './routes/HomeRoutes'

import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="home" component={Home}>	
    	<Route path="servicio" component={Servicio}/> 
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), document.getElementById('app'))