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

// '$2y$10$MzQxNzNjYjM4ZjA3Zjg5ZG'

const sessionMiddleware = session({
  store: Store,
  secret: '$2y$10$MzQxNzNjYjM4ZjA3Zjg5ZG',
  saveUninitialized: false,
  resave: false
})

//app.use(cookieParser())
app.use(sessionMiddleware)

let server = http.createServer(app).listen(port, () => {
  console.log('Estamos en el ' + port)
})

const io = require('socket.io')(server)

io.use( (socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next)
} )

io.sockets.on('connection', (socket) => {

  socket.on('login', (data, check = true) => {
      request.post({
        uri: process.env.apiLogin,
        form: {
          user: data.userName,
          pass: data.pass
        }
      }, (error, response, data) => {
        if (error) throw error
        if(data == 1){
          /*
          socket.request.session.user = 'lonji'
          socket.request.session.save()
          console.log( socket.request.session.user )
          */

          socket.request.session.user = 'lonji'
          socket.request.session.save()

          //console.log( `LOGIN id ${socket.request.session.id}`  )
          //console.log( `LOGIN ID ${socket.request.sessionID}`  )

          //console.log( `LOGIN SOCKET ID ${socket.id}` )

          io.emit('login', check)
        }else{
          check = false
          io.emit('login', check)
        }
      })

  })

  socket.on('checklogin', () => {

          //console.log( `CHECK SOCKET ID ${socket.id}` )
          //console.log( `CHECK id ${socket.request.session.id}`  )
          //console.log( `CHECK ID ${socket.request.sessionID}`  )
   // console.log( socket.request.sessionID )
   //console.log( socket )
   
   /*
    Store.get( `sess:${socket.request.sessionID}`, (err, session) =>{
      console.log( err )
      console.log( session )
      io.emit('checklogin', session )
    })
*/
  if (!socket.request.session.user) {
    io.emit('checklogin', false )
    //console.log( socket.request.res )
  } else {
    io.emit('checklogin', true )
  }


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
  socket.on('informe', (data, cant) => {
    con.query('SELECT proyecto.CODIGO_PROYECTO, servicio.NOMBRE_SERVICIO, servicio.CODIGO_SERVICIO,  proyecto.OBRA, proyecto.NOMBRE_CLIENTE, proyecto.EJECUTIVO , proyecto.FECHA_INGRESO, proyecto.FECHA_CONFIRMACION FROM servicio, proyecto WHERE proyecto.CODIGO_PROYECTO = servicio.CODIGO_PROYECTO and NOMBRE_SERVICIO = "'+data+'" limit '+cant +' ', function(err, rows, fields) {
    console.log(cant)
    if (!err)
      socket.emit('item', rows)
    else
      console.log('Error ' + err);
    }); 
  })


})

  
app.all('*', (request, response) => {

/*
  if (!request.sessionID) {
    request.session.save()
  }
  */
/*
    Store.get( `sess:${request.sessionID}`, (err, session) =>{
      if (err) throw err 
      if(!session){
        request.session.save()
      } 
    })
*/



  if (!request.session.on) {
    request.session.on = true
  }


  console.log( `ROUTER id ${request.session.id}` )
  console.log( `ROUTER ID ${request.sessionID}` )

  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))


})