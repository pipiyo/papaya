'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 9097
const http = require('http')
const request = require('request')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

require('./env').config()


const Store = new RedisStore({ ttl: 120 })


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

io.sockets.on('connection', (socket) => {

  socket.on('login', (data, callback) => {

      request.post({
        uri: process.env.apiLogin,
        form: {
          user: data.userName,
          pass: data.pass
        }
      }, (error, response, auht) => {
        if (error) throw console
          
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
        console.log( err )
        console.log( session )
        if (session) {
          callback( session.name, session.type, data )
        } else {
         callback( session, session, session ) 
        }
      })

  })

})


  
app.all('*', (request, response, next) => {

/*
  if (!request.sessionID) {
    request.session.save()
  }
  */
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))

} )
