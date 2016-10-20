'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const http = require('http')
const engine = require('socket.io')
const request = require('request')
const con = require('./srcApirest/connection');

const app = express()

con.connect( (err) => {
  if (err) throw err
  console.log('conexta3')
    
    })

// '$2y$10$MzQxNzNjYjM4ZjA3Zjg5ZG'

app.use(express.static(__dirname + '/bundle'))

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))
})

let server = http.createServer(app).listen(port, () => {
  console.log('Estamos en el ' + port)
})

const io = engine.listen(server);

io.on('connection', (socket) => {
  
  socket.on('login', (data, check = true) => {

      request.post({
        uri: "http://localhost:8888/apirest/apirest.php",
        form: {
          user: data.userName,
          pass: data.pass
        }
      }, (error, response, data) => {
        if (error) throw error
        console.log( data )
        if(data == 1){
          io.emit('login', check)
        }else{
          check = false
          io.emit('login', check)
        }
      })
  
  })

})