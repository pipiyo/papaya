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

 })//connection socket

}//module.exports