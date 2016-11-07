import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import Reclamo from './routes/ReclamoRoutes'
import InformeReclamo from './routes/InformeReclamoRoutes'
import Informe from './routes/InformeRoutes'
import Notificacion from './routes/NotificacionRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'
import Home from './routes/HomeRoutes'
import Inicio from './routes/InicioRoutes'

import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="home" component={Home}>	
        <IndexRoute component={Inicio}/>
    	<Route path="actividad/:tipo" component={Servicio}/>
    	<Route path="informe/:area" component={Informe}/>
        <Route path="reclamo" component={Reclamo}/>
        <Route path="informe-reclamo" component={InformeReclamo}/>
        <Route path="notificacion" component={Notificacion}/>
    	<Route path="detalle-actividad" component={DetalleInforme}/> 
        <Route path="detalle-actividad/sub-actividad" component={SubServicio}/>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), document.getElementById('app'))