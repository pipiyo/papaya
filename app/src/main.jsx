import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import Abastecimiento from './routes/AbastecimientoRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'

import Home from './routes/HomeRoutes'

import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="home" component={Home}>	
    	<Route path="actividad" component={Servicio}/>
    	<Route path="abastecimiento" component={Abastecimiento}/> 
    	<Route path="detalle-actividad" component={DetalleInforme}/> 
        <Route path="detalle-actividad/sub-actividad" component={SubServicio}/>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), document.getElementById('app'))