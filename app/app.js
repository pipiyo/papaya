'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const http = require('http')
const request = require('request')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const Store = new RedisStore({})


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
  secret: 'asdfghjk',
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
        uri: "http://local.rocha/apirest/apirest.php",
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

          socket.request.session.user = 'lonjiman'
          socket.request.session.save()

          console.log( `LOGIN id ${socket.request.session.id}`  )
          console.log( `LOGIN ID ${socket.request.sessionID}`  )

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
          console.log( `CHECK id ${socket.request.session.id}`  )
          console.log( `CHECK ID ${socket.request.sessionID}`  )
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
  } else {
    io.emit('checklogin', true )
  }


  })

})


app.get('*', (request, response) => {

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