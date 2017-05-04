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
import ClonerRocha from './routes/ClonerRochaRoutes'
import Notificacion from './routes/NotificacionRoutes'
import DetalleInforme from './routes/DetalleInformeRoutes'
import Bodega from './routes/BodegaRoutes'
import BodegaSon from './routes/BodegaSonRoutes'
import Home from './routes/HomeRoutes'
import Inicio from './routes/InicioRoutes'
import AddProducto from './routes/AddProductoRoutes'
import UpdateProducto from './routes/UpdateProductoRoutes'
import UpdateProductoPrecio from './routes/UpdateProductoPrecioRoutes'
import Producto from './routes/ProductoRoutes'
import StockProducto from './routes/StockPruductoRoutes'
import CuadroRocha from './routes/CuadroRochaRoutes'
import CuadroRochaComercial from './routes/CuadroRochaComercialRoutes'
import DescriptionRocha from './routes/DescriptionRochaRoutes'
import ListadoOc from './routes/ListadoOcRoutes'
import UpdateOcFecha from './routes/UpdateOcFechaRoutes'
import DescriptionOc from './routes/DescriptionOcRoutes'
import Auth from './routes/AuthRoutes'
import OrdenCompra from './routes/OrdenCompraRoutes'
import ValeEmision from './routes/ValeEmisionRoutes'
import RecibirOc from './routes/RecibirOCRoutes'
import RecibirVale from './routes/RecibirValeRoutes'
import ListadoVale from './routes/ListadoValeRoutes'
import UpdateOc from './routes/UpdateOcRoutes'
import UpdateVale from './routes/UpdateValeRoutes'
import ListadoCliente from './routes/ListadoClienteRoutes'
import AddCliente from './routes/AddClienteRoutes'
import UpdateCliente from './routes/UpdateClienteRoutes'
import ListadoProveedor from './routes/ListadoProveedorRoutes'
import AddProveedor from './routes/AddProveedorRoutes'
import UpdateProveedor from './routes/UpdateProveedorRoutes'
import BodegaSilla from './routes/BodegaSillaRoutes'
import Bloqueo from './routes/BloqueoRoutes'
import ListadoReclamo from './routes/ListadoReclamoRoutes'
import UpdateReclamo from './routes/UpdateReclamoRoutes'
import ListadoVehiculo from './routes/ListadoVehiculoRoutes'
import AddVehiculo from './routes/AddVehiculoRoutes'
import UpdateVehiculo from './routes/UpdateVehiculoRoutes'
import ListadoLinea from './routes/ListadolineaRoutes'
import AddLinea from './routes/AddLineaRoutes'
import UpdateLinea from './routes/UpdateLineaRoutes'

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
            <Route path="actualizar-producto-precio/:id" component={UpdateProductoPrecio}/>
            <Route path="producto/:id" component={Producto}/>
            <Route path="stock-producto/:bodega/:id" component={StockProducto}/>
            <Route path="bodega-seleccion/:id" component={BodegaSon}/>
            <Route path="listado-cliente" component={ListadoCliente}/>
            <Route path="ingreso-cliente" component={AddCliente}/>
            <Route path="actualizar-cliente/:id" component={UpdateCliente}/>
            <Route path="bodega-silla" component={BodegaSilla}/>
            <Route path="bloqueo" component={Bloqueo}/>            
            <Route path="cuadro-proyecto-comercial" component={CuadroRochaComercial}/>
            <Route path="cuadro-proyecto" component={CuadroRocha}/>
            <Route path="descripcion-rocha/:id" component={DescriptionRocha}/>
            <Route path="listado-oc" component={ListadoOc}/>
            <Route path="listado-vale" component={ListadoVale}/>
            <Route path="actualizar-oc-fecha/:id" component={UpdateOcFecha}/>
            <Route path="descripcion-oc/:id" component={DescriptionOc}/>
            <Route path="orden-de-compra" component={OrdenCompra}/>
            <Route path="actualizar-rocha/:id" component={UpdateRocha}/>
            <Route path="copiar-rocha/:id" component={ClonerRocha}/>
            <Route path="recibir-oc/:id" component={RecibirOc}/>
            <Route path="recibir-vale/:id" component={RecibirVale}/>
            <Route path="actualizar-oc/:id" component={UpdateOc}/>
            <Route path="actualizar-vale/:id" component={UpdateVale}/>
            <Route path="vale-emision" component={ValeEmision}/>
            <Route path="listado-proveedor" component={ListadoProveedor}/>
            <Route path="ingreso-proveedor" component={AddProveedor}/>
            <Route path="actualizar-proveedor/:id" component={UpdateProveedor}/>
            <Route path="listado-reclamo" component={ListadoReclamo}/>
            <Route path="actualizar-reclamo/:id" component={UpdateReclamo}/>
            <Route path="listado-vehiculo" component={ListadoVehiculo}/>
            <Route path="ingreso-vehiculo" component={AddVehiculo}/>
            <Route path="actualizar-vehiculo/:id" component={UpdateVehiculo}/>
            <Route path="listado-linea" component={ListadoLinea}/>
            <Route path="ingreso-linea" component={AddLinea}/>
            <Route path="actualizar-linea/:id" component={UpdateLinea}/>
        </Route>
    </Route>
    <Route path="*" component={Servicio} />
  </Router>
), window.__myapp_container)