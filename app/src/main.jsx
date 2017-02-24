import React from 'react' 

import ReactDOM from 'react-dom' 

//import Perf from 'react-addons-perf'

import Profile from './routes/ProfileRoutes'
import Login from './routes/LoginRoutes'
import Servicio from './routes/ServicioRoutes'
import UpdateServicio from './routes/UpdateServicioRoutes'
import SubServicio from './routes/SubServicioRoutes'
import UpdateSubServicio from './routes/UpdateSubServicioRoutes'
import IndicadorSubServicio from './routes/IndicadorSubServicioRoutes'
import IndicadorServicio from './routes/IndicadorServicioRoutes'
import Reclamo from './routes/ReclamoRoutes'
import Informe from './routes/InformeRoutes'
import InformeRocha from './routes/InformeRochaRoutes'
import AddRocha from './routes/AddRochaRoutes'
import UpdateRocha from './routes/UpdateRochaRoutes'
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
import CuadroRocha from './routes/CuadroRochaRoutes'
import DescriptionRocha from './routes/DescriptionRochaRoutes'
import ListadoOc from './routes/ListadoOcRoutes'
import UpdateOcFecha from './routes/UpdateOcFechaRoutes'
import DescriptionOc from './routes/DescriptionOcRoutes'
import Auth from './routes/AuthRoutes'
import OrdenCompra from './routes/OrdenCompraRoutes'
import RecibirOc from './routes/RecibirOCRoutes'
import RecibirVale from './routes/RecibirValeRoutes'
import ListadoVale from './routes/ListadoValeRoutes'

import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router'

window.__myapp_container = document.getElementById('app')

//window.Perf = Perf

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
            <Route path="indicadores-actividad/:area" component={IndicadorServicio}/>
            <Route path="bodega/:area" component={Bodega}/>
            <Route path="ingreso-producto" component={AddProducto}/>
            <Route path="actualizar-producto/:bodega/:id" component={UpdateProducto}/>
            <Route path="producto/:id" component={Producto}/>
            <Route path="stock-producto/:bodega/:id" component={StockProducto}/>
            <Route path="bodega-seleccion/:id" component={BodegaSon}/>
            <Route path="cuadro-proyecto" component={CuadroRocha}/>
            <Route path="descripcion-rocha/:id" component={DescriptionRocha}/>
            <Route path="listado-oc" component={ListadoOc}/>
            <Route path="listado-vale" component={ListadoVale}/>
            <Route path="actualizar-oc-fecha/:id" component={UpdateOcFecha}/>
            <Route path="descripcion-oc/:id" component={DescriptionOc}/>
            <Route path="orden-de-compra" component={OrdenCompra}/>
            <Route path="actualizar-rocha/:id" component={UpdateRocha}/>
            <Route path="recibir-oc/:id" component={RecibirOc}/>
            <Route path="recibir-vale/:id" component={RecibirVale}/>
        </Route>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), window.__myapp_container)