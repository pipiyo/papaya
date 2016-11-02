import React from 'react' 
import ReactDOM from 'react-dom' 

import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import Reclamo from './routes/ReclamoRoutes'
import InformeReclamo from './routes/InformeReclamoRoutes'
import Abastecimiento from './routes/AbastecimientoRoutes'
import Comercial from './routes/ComercialRoutes'
import Tecnica from './routes/TecnicaRoutes'
import Despacho from './routes/DespachoRoutes'
import Instalacion from './routes/InstalacionRoutes'
import Sillas from './routes/SillasRoutes'
import Produccion from './routes/ProduccionRoutes'
import Planificacion from './routes/PlanificacionRoutes'
import Notificacion from './routes/NotificacionRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'
import Home from './routes/HomeRoutes'

import { Router, Route, Redirect, hashHistory, IndexRoute } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="home" component={Home}>	

    	<Route path="actividad/:tipo" component={Servicio}/>
    	<Route path="abastecimiento" component={Abastecimiento}/>
        <Route path="comercial" component={Comercial}/> 
        <Route path="tecnica" component={Tecnica}/> 
        <Route path="despacho" component={Despacho}/> 
        <Route path="instalacion" component={Instalacion}/> 
        <Route path="sillas" component={Sillas}/> 
        <Route path="produccion" component={Produccion}/>
        <Route path="planificacion" component={Planificacion}/>
        <Route path="reclamo" component={Reclamo}/>
        <Route path="informe-reclamo" component={InformeReclamo}/>
        <Route path="notificacion" component={Notificacion}/>
    	<Route path="detalle-actividad" component={DetalleInforme}/> 
        <Route path="detalle-actividad/sub-actividad" component={SubServicio}/>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), document.getElementById('app'))