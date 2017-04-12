const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/bloqueo')
  .on('connection', (socket) => {


	  socket.on('get', (form, callback) => {

/////////////////////////////////////



//////////////////////////////////////

	  })

 })//connection socket

}//module.exports