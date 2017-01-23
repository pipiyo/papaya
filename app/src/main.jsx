import React from 'react' 

import ReactDOM from 'react-dom' 

import Perf from 'react-addons-perf'

import Profile from './routes/ProfileRoutes'
import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import UpdateServicio from './routes/UpdateServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import UpdateSubServicio from './routes/UpdateSubServicioRoutes'
import IndicadorSubServicio from './routes/IndicadorSubServicioRoutes'
import Reclamo from './routes/ReclamoRoutes'
import Informe from './routes/InformeRoutes'
import InformeRocha from './routes/InformeRochaRoutes'
import AddRocha from './routes/AddRochaRoutes'
import Notificacion from './routes/NotificacionRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'
import Bodega from './routes/BodegaRoutes'
import BodegaSon from './routes/BodegaSonRoutes'
import Home from './routes/HomeRoutes'
import Inicio from './routes/InicioRoutes'
import AddProducto from './routes/AddProductoRoutes'
import UpdateProducto from './routes/UpdateProductoRoutes'
import Producto from './routes/ProductoRoutes'
import StockProducto from './routes/StockPruductoRoutes'

import Auth from './routes/AuthRoutes'

import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router'

window.__myapp_container = document.getElementById('app')

window.Perf = Perf

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route component={Auth}>
        <Route path="home" component={Home}>	
            <IndexRoute component={Inicio}/>
            <Route path="profile" component={Profile}/>
        	<Route path="actividad/:rocha/:tipo" component={Servicio}/>
        	<Route path="informe/:area" component={Informe}/>
            <Route path="informe-rochas" component={InformeRocha}/>
            <Route path="ingreso-proyecto" component={AddRocha}/>
            <Route path="actualizar-actividad/:id" component={UpdateServicio}/>
            <Route path="reclamo" component={Reclamo}/>
            <Route path="notificacion" component={Notificacion}/>
        	<Route path="detalle-actividad/:id" component={DetalleInforme}/> 
            <Route path="sub-actividad/:id" component={SubServicio}/>
            <Route path="actualizar-subactividad/:id" component={UpdateSubServicio}/>
            <Route path="indicadores/:area" component={IndicadorSubServicio}/>
            <Route path="bodega/:area" component={Bodega}/>
            <Route path="ingreso-producto" component={AddProducto}/>
            <Route path="actualizar-producto/:bodega/:id" component={UpdateProducto}/>
            <Route path="producto/:id" component={Producto}/>
            <Route path="stock-producto/:bodega/:id" component={StockProducto}/>
            <Route path="bodega-seleccion/:id" component={BodegaSon}/>
        </Route>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), window.__myapp_container)