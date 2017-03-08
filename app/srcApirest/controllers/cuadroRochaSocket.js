const pool = require('../models/connection')
const cuadroRochaSearch = require('../searchs/cuadroRochaSearch')

module.exports = (io) => {

  io
  .of('/cuadroRocha')
  .on('connection', (socket) => {

	  socket.on('getRochaFiltro', (form, callback) => {

/////////////////////////////////////

		cuadroRochaSearch( pool, form, callback )

//////////////////////////////////////

	  }),//on getRochasFiltro

	  socket.on('getRochas', (form, callback) => {

		cuadroRochaSearch( pool, form, callback )

	  })//on getRochas

	  socket.on('sillas', (color) => {

	      pool.getConnection( (err, connection) => {
	          connection.query(query+query1+query2, (err, rows, fields) => {
	              connection.release()
	              if (!err)
	                resolve( callback({ sub:rows[0], total:rows[1], ejecutivo:rows[2]}) )
	              else
	                reject( console.log('Error ' + err) )
	          }) 
	      })

	  })//on getRochas


 })//connection socket

}//module.exports