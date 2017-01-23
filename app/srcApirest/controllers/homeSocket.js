const Notification = require('../models/notification')
const Content = require('../models/content')
const PubSub = require('pubsub-js')

module.exports = (io) => {

  io
  .of('/home')
  .on('connection', (socket) => {

	  socket.on('getAreas', (callback) => {
		Content.
		  find({}).
		  exec( (err, n) => {
		  	if (err) console.log(err)
		  	callback(n)
		  })
	  })

	  socket.on('getNumberNotification', (callback) => {
		Notification.
		  find({ 'read_by': { $ne: global.userName } }).
		  count().
		  exec( (err, n) => {
		  	if (err) console.log(err)
		  	callback(n)
		  })
	  })

	  socket.on('getNotification', (callback) => {

		Notification.
			update( { }, 
						 { $addToSet: 
						 	{ read_by: global.userName 
						 	}  
					 }, 
					 {multi: true},
					  function (err, tank) {
						  if (err) console.log( err )
		})

		Notification.
		  find({}).
		  limit(5).
		  populate('user area').
		  sort('-create_at').
		  exec( (err, notification) => {
		  	if (err) console.log( err )
		  	callback(notification)
		  })
	  })

	 	PubSub.subscribe('notification', function( msg, data ){

			Notification.
			  find({ 'read_by': { $ne: global.userName } }).
			  populate('user area').
			  count().
			  exec( (err, notification) => {
			  	if (err) console.log(err)
			  	socket.broadcast.emit('popupNotification', notification)
			  })

	 	})

  })


}