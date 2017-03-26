'use strict'

const express = require('express')
const path = require('path')
const port = process.env.PORT || 9097
const http = require('http')
const request = require('request')
const moment = require('moment')


//console.log( moment('09:00:00', 'h:mm:ss').fromNow(), moment().format('h:mm:ss') )

require('./env').config()

require('./globals').globals()

const app = express()

app.use(express.static(__dirname + '/bundle'))

/*
con.connect( (err) => {
  if (err) throw err
  console.log('conexta3')
    })
*/



let server = http.createServer(app).listen(port, () => {
  console.log('Estamos en el ' + port)
})

const io = require('socket.io')(server)


require('./srcApirest/controllers/homeSocket')(io)

require('./srcApirest/controllers/notificationSocket')(io)

require('./srcApirest/controllers/loginSocket')(io, request)

require('./srcApirest/controllers/servicioSocket')(io)

require('./srcApirest/controllers/subServicioSocket')(io)

require('./srcApirest/controllers/reclamoSocket')(io)

require('./srcApirest/controllers/rochaSocket')(io)

require('./srcApirest/controllers/bodegaSocket')(io)

require('./srcApirest/controllers/bodegaHijosSocket')(io)

require('./srcApirest/controllers/productoSocket')(io)

require('./srcApirest/controllers/proyectoSocket')(io)

require('./srcApirest/controllers/descriptionRochaSocket')(io)

require('./srcApirest/controllers/listadoOcSocket')(io)

require('./srcApirest/controllers/listadoValeSocket')(io)

require('./srcApirest/controllers/ordenDeCompraSocket')(io)

require('./srcApirest/controllers/valeDeEmisionSocket')(io)

require('./srcApirest/controllers/cuadroRochaSocket')(io)

require('./srcApirest/controllers/autocompleteSocket')(io)

require('./srcApirest/controllers/emisionOcSocket')(io)

require('./srcApirest/controllers/emisionValeSocket')(io)

require('./srcApirest/controllers/bodegaSillaSocket')(io)

  
app.all('*', (request, response, next) => {
  response.sendFile(path.resolve(__dirname, 'bundle', 'index.html'))
})
