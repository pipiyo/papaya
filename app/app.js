'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const http = require('http')
const engine = require('socket.io')

const app = express()

app.use(express.static(__dirname + '/bundle'))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))
})

let server = http.createServer(app).listen(port, () => {
  console.log('Estamos en el ' + port)
})

const io = engine.listen(server);

io.on('connection', (socket) => {
  
  socket.on('login', (data, check = true) => {
  	if (data.userName == 'fcb') {
  		io.emit('login', check)
  	} else {
  		check = false
  		io.emit('login', check)
  	}
    console.log(data);
  })

})
