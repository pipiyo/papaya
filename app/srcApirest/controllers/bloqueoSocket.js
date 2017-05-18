const pool = require('../models/connection')

const Content = require('../models/content')

const Area = require('../models/area')

module.exports = (io) => {

  io
  .of('/bloqueo')
  .on('connection', (socket) => {




	  socket.on('guardar', (area, item, callback ) => {

				Area.
				  update({ _id: `${area}` }, {$set: { items: item } } ).
				  exec( (err, a) => {
				  	if (err) callback( err )
						callback( `Cambios realisados` )
				  })

	  })




	  socket.on('get', ( callback ) => {

		Content.
		  find({}).
		  exec( (err, n) => {
		  	if (err) console.log(err)
			return n
		  }).then( (content) => {

				Area.
				  find({}).
				  exec( (err, area) => {
				  	if (err) console.log(err)
					callback( content, area )
				  })

		  })

	  })

	  socket.on('getAreaItem', (area, callback ) => {

				Area.
				  findOne({ _id: `${area}` }).
				  exec( (err, a) => {
				  	if (err) console.log(err)
					callback( a )
				  })

	  })


 })//connection socket

}//module.exports