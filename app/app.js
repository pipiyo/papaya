'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 9097
const http = require('http')
const request = require('request')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

require('./env').config()


const Store = new RedisStore({ ttl: 10020 })


const con = require('./srcApirest/connection')

const app = express()

app.use(express.static(__dirname + '/bundle'))

con.connect( (err) => {
  if (err) throw err
  console.log('conexta3')
    
    })

const sessionMiddleware = session({
  store: Store,
  secret: '$2y$10$MzQxNzNjYjM4ZjA3Zjg5ZG',
  saveUninitialized: false,
  resave: false
})


app.use(sessionMiddleware)

let server = http.createServer(app).listen(port, () => {
  console.log('Estamos en el ' + port)
})

const io = require('socket.io')(server)

io.use( (socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next)
} )





let login = io
  .of('/login')
  .on('connection', (socket) => {

    socket.on('login', ( data, callback) => {
        request.post({
          uri: process.env.apiLogin,
          form: {
            user: data.userName,
            pass: data.pass
          }
        }, (error, response, auht) => {
          console.log( error )
          if (error) throw error
            auht = JSON.parse(auht)
          if(auht.on){
            socket.request.session.name = auht.name
            socket.request.session.type = auht.type
            socket.request.session.save()
            auht.on = socket.request.sessionID
            callback(auht)
          }else{
            callback(false)
          }
        })
    })

    socket.on('checkUser', (data, callback) => {
        Store.get( data, (err, session) =>{
          if (err) throw err
          if (session) {
            callback( session.name, session.type, data )
          } else {
           callback( session, session, session ) 
          }
        })
    })


  })
 




let servicio = io
  .of('/servicio')
  .on('connection', function (socket) {



  /* Trae Comunas */
  socket.on('comunas', (callback) => {


    con.query('select `CODIGO_COMUNA` AS codigo, `NOMBRE_COMUNA` AS nombre from `comunas`', function(err, rows, fields) {
      if (err) console.log( err ) 

      console.log(rows[0].nombre, rows[0].codigo )
    })


  })





  /* Ingreso Servicio */
  socket.on('servicio', (data) => {
    let servicio = {  
                      NOMBRE_SERVICIO: data.area, 
                      CATEGORIA: data.categoria, 
                      SUPERVISOR: data.supervisor,
                      FECHA_INICIO: data.fechaInicio,
                      FECHA_ENTREGA: data.fechaEntrega,
                      DESCRIPCION: data.descripcion,
                      OBSERVACIONES: data.observacion,
                      CODIGO_PROYECTO : data.rocha,
                      DIRECCION : data.direccion,
                      GUIA_DESPACHO: data.guia,
                      CODIGO_COMUNA: data.comuna,
                      M3: data.m3,
                      FI: data.fi,
                      TM: data.tm,
                      TP: data.to,
                      OS: data.os,
                      LIDER: data.lider,
                      PUESTOS: data.puestos,
                      PROCESO: data.proceso,    
                      INSTALADOR_1: data.instalador1,
                      INSTALADOR_2: data.instalador2,
                      INSTALADOR_3: data.instalador3,
                      EJECUTOR: data.ejecutor,
                      VALE: data.vale, 
                      TRANSPORTE: data.vehiculo,    
                      CANTIDAD: data.cantidad,
                      RECLAMOS: data.reclamo,
                      ESTADO: "EN PROCESO",
                      DIAS: data.dias
                    }
    let mensaje = '(Se ingreso servicio ' + data.area + ')'

    con.query('INSERT INTO `servicio` SET ?',servicio, (err) => {
    if (!err)
      console.log('Se ingreso servicio ' + data.area);
    else
      console.log('Error no se pudo ingresar servicio '+ err);
    })

    socket.emit('mensaje', mensaje)
  })

  /* Update Servicio */
  socket.on('servicioUpdate', (data) => {
    let servicio = {  
                      CATEGORIA: data.categoria, 
                      SUPERVISOR: data.supervisor,
                      FECHA_INICIO: data.fechaInicio,
                      FECHA_ENTREGA: data.fechaEntrega,
                      DESCRIPCION: data.descripcion,
                      OBSERVACIONES: data.observacion,
                      CODIGO_SERVICIO : data.numero,
                      DIRECCION : data.direccion,
                      GUIA_DESPACHO: data.guia,
                      CODIGO_COMUNA: data.comuna,
                      M3: data.m3,
                      FI: data.fi,
                      TM: data.tm,
                      TP: data.to,
                      OS: data.os,
                      LIDER: data.lider,
                      PUESTOS: data.puestos,
                      PROCESO: data.proceso,    
                      INSTALADOR_1: data.instalador1,
                      INSTALADOR_2: data.instalador2,
                      INSTALADOR_3: data.instalador3,
                      EJECUTOR: data.ejecutor,
                      VALE: data.vale, 
                      TRANSPORTE: data.vehiculo,    
                      CANTIDAD: data.cantidad,
                      RECLAMOS: data.reclamo,
                      ESTADO: data.estado,
                      DIAS: data.dias
                    }
    let mensaje = '(Se update servicio ' + data.numero + ')'

    con.query('UPDATE servicio SET CATEGORIA = ?, SUPERVISOR = ?, FECHA_INICIO = ?, FECHA_ENTREGA = ?, DESCRIPCION = ?, OBSERVACIONES = ?, DIRECCION  = ?, GUIA_DESPACHO = ?, CODIGO_COMUNA = ?, M3 = ?, FI = ?, TM = ?, TP = ?, OS = ?, LIDER = ?, PUESTOS = ?, PROCESO = ?, INSTALADOR_1 = ?, INSTALADOR_2 = ?, INSTALADOR_3 = ?, EJECUTOR = ?, VALE = ?, TRANSPORTE = ?, CANTIDAD = ?, RECLAMOS = ?, ESTADO = ?, DIAS = ?  WHERE CODIGO_SERVICIO = ?', [data.categoria, data.supervisor, data.fechaInicio, data.fechaEntrega, data.descripcion, data.observacion, data.direccion, data.guia, data.comuna, data.m3, data.fi, data.tm, data.to, data.os, data.lider, data.puestos, data.proceso, data.instalador1, data.instalador2, data.instalador3, data.ejecutor, data.vale, data.vehiculo, data.cantidad, data.reclamo, data.estado, data.dias, data.numero], function(err, results) {
    if (!err)
      console.log('Se actualizo servicio ' + data.numero);
    else
      console.log('Error no se pudo ingresar servicio '+ err);
    })

    socket.emit('mensaje', mensaje)
  })

  /* Listar Servicio */
  socket.on('servicioListar', (id) => {
      let query = 'SELECT * FROM servicio WHERE CODIGO_SERVICIO = "'+id+'"'; 
      con.query(query, function(err, rows, fields) {
      if (!err)
        socket.emit('items', rows)
      else
        console.log('Error ' + err);
      }); 
  })

  /* Ingreso Reclamo */
  socket.on('reclamo', (data) => {
    let reclamo = {  
                      AREA: data.area,
                      ROCHA : data.rocha,
                      FECHA_INICIO: data.fechaInicio,
                      FECHA_TERMINO: data.fechaEntrega,
                      ESTADO: "EN PROCESO",
                      RAZON: data.razon,
                      AREA1: data.area1,
                      AREA2: data.area1
                    }
    let mensaje = '(Se ingreso Reclamo ' + data.area + ')'

    con.query('INSERT INTO `reclamos` SET ?',reclamo, (err) => {
    if (!err)
      console.log('Se ingreso reclamo ' + data.area);
    else
      console.log('Error no se pudo ingresar reclamo '+ err);
    })
    console.log(data)
    socket.emit('mensaje', mensaje)
  })

   /* Informes */
  socket.on('informe', (data, cant, estado, codigo, vendedor, categoria, fecha, cliente) => {
    if(data == "reclamo"){
      let query = 'SELECT reclamos.CODIGO_RECLAMO, servicio.RECLAMOS, reclamos.RAZON, reclamos.AREA, proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto, reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and '+estado+' '+codigo+' '+vendedor+' '+categoria+' '+fecha+' '+cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';'; 
      con.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto,reclamos WHERE reclamos.ROCHA = proyecto.CODIGO_PROYECTO and proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO IN ("Adquisiciones","Desarrollo","Despacho","Instalacion","Produccion","Sillas") and '+estado+' '+codigo+' '+vendedor+' '+categoria+' '+fecha+'', function(err, rows, fields) {
      if (!err)
        socket.emit('item', { valor:rows[0], cuenta:rows[1]})
      else
        console.log('Error ' + err);
      }); 
    }else{
      let query = 'SELECT proyecto.CODIGO_PROYECTO,servicio.TP, servicio.TM, servicio.OS, servicio.PROCESO, servicio.FI, servicio.DESCRIPCION, servicio.SUPERVISOR, servicio.ESTADO, servicio.DIRECCION, servicio.OBSERVACIONES, servicio.FECHA_INICIO, servicio.FECHA_ENTREGA, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and '+data+' and '+estado+' '+codigo+' '+vendedor+' '+categoria+' '+fecha+' '+cliente+'  order by proyecto.FECHA_CONFIRMACION asc, proyecto.CODIGO_PROYECTO  limit '+cant +';'; 
      con.query(query + 'select count(proyecto.CODIGO_PROYECTO) as total FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and '+data+' and '+estado+' '+codigo+' '+vendedor+' '+categoria+' '+fecha+'', function(err, rows, fields) {
      if (!err)
        socket.emit('item', { valor:rows[0], cuenta:rows[1]})
      else
        console.log('Error ' + err);
      });
    }

  })

})

let subServicio = io
  .of('/subServicio')
  .on('connection', function (socket) {

  /* Sub Servicio */
  socket.on('servicioListar', (data) => {
      let query = 'SELECT `CODIGO_PROYECTO`,`DESCRIPCION`,`OBSERVACIONES`,`CODIGO_SERVICIO`, `FECHA_INICIO`, `FECHA_ENTREGA`, `CODIGO_SUBSERVICIO`, `SUB_CODIGO_SERVICIO`, `SUB_NOMBRE_SERVICIO`, `SUB_FECHA_INICIO`, `SUB_FECHA_ENTREGA`, `SUB_REALIZADOR`, `SUB_SUPERVISOR`, `SUB_OBSERVACIONES`, `SUB_ESTADO`, `SUB_CODIGO_USUARIO`, `SUB_CODIGO_PROYECTO`, `SUB_DESCRIPCION`, `SUB_DIRECCION`, `SUB_TPTMFI`, `SUB_GUIA_DESPACHO`, `SUB_CODIGO_OC`, `SUB_INSTALADOR_1`, `SUB_INSTALADOR_2`, `SUB_INSTALADOR_3`, `SUB_INSTALADOR_4`, `SUB_LIDER`, `SUB_DIAS`, `SUB_PREDECESOR`, `SUB_PUESTOS`, `SUB_PROCESO`, `SUB_EJECUTOR`, `SUB_DOCUMENTO_SERVICIO_TECNICO`, `SUB_TIPO_SERVICIO`, `SUB_TECNICO_1`, `SUB_TECNICO_2`, `SUB_CODIGO_RADICADO`, `SUB_TRANSPORTE`, `SUB_FECHA_REALIZACION`, `SUB_RECLAMOS`, `SUB_OC`, `SUB_FECHA_PRIMERA_ENTREGA`, `SUB_CATEGORIA`, `SUB_CANTIDAD`, `SUB_BODEGA`, `SUB_FI`, `SUB_ORDEN_SERVICIO`, `SUB_VALE`, `SUB_CODIGO_COMUNA`, `SUB_PROGRESO`, `SUB_M3`, `SUB_FACTURA`, `SUB_MONTO_FACTURA`, `SUB_RECEPCION`, `SUB_ARCHIVO`, `SUB_TM`, `SUB_TP`, `SUB_OS` FROM `sub_servicio`, `servicio` WHERE servicio.CODIGO_SERVICIO = sub_servicio.SUB_CODIGO_SERVICIO and servicio.CODIGO_SERVICIO = "'+data+'";'; 
      let query1 = 'SELECT * FROM servicio WHERE CODIGO_SERVICIO = "'+data+'"'; 
      con.query(query+query1 , function(err, rows, fields) {
        console.log(rows)
        console.log(err)
      if (!err)
        socket.emit('items', { sub:rows[0], servicio:rows[1]})
      else
        console.log('Error ' + err);
      }); 
  })

})


  
app.all('*', (request, response, next) => {

/*
  if (!request.sessionID) {
    request.session.save()
  }
  */
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))

})
