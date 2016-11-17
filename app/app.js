'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 9097
const http = require('http')
const request = require('request')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const Notification = require("./srcApirest/models/notification")

require('./env').config()


const Store = new RedisStore({ ttl: 10020 })


const pool = require('./srcApirest/models/connection')

const app = express()

app.use(express.static(__dirname + '/bundle'))

/*
con.connect( (err) => {
  if (err) throw err
  console.log('conexta3')
    })
*/

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


require('./srcApirest/controllers/loginSocket')(io, request, Store)

require('./srcApirest/controllers/servicioSocket')(io, pool, Notification)

require('./srcApirest/controllers/subServicioSocket')(io, pool)

require('./srcApirest/controllers/reclamoSocket')(io, pool)

  
app.all('*', (request, response, next) => {
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))
})
