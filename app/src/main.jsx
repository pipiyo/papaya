import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import UpdateServicio from './routes/UpdateServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import UpdateSubServicio from './routes/UpdateSubServicioRoutes'
import Reclamo from './routes/ReclamoRoutes'
import Informe from './routes/InformeRoutes'
import InformeRocha from './routes/InformeRochaRoutes'
import Notificacion from './routes/NotificacionRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'
import Home from './routes/HomeRoutes'
import Inicio from './routes/InicioRoutes'

import Auth from './routes/AuthRoutes'

import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route component={Auth}>
        <Route path="home" component={Home}>	
            <IndexRoute component={Inicio}/>
        	<Route path="actividad/:tipo" component={Servicio}/>
        	<Route path="informe/:area" component={Informe}/>
            <Route path="informe-rochas" component={InformeRocha}/>
            <Route path="actualizar-actividad/:id" component={UpdateServicio}/>
            <Route path="reclamo" component={Reclamo}/>
            <Route path="notificacion" component={Notificacion}/>
        	<Route path="detalle-actividad/:id" component={DetalleInforme}/> 
            <Route path="sub-actividad/:id" component={SubServicio}/>
            <Route path="actualizar-subactividad/:id" component={UpdateSubServicio}/>
        </Route>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), document.getElementById('app'))