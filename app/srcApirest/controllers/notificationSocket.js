const Notification = require('../models/notification')

module.exports = (io) => {

  io
  .of('/notification')
  .on('connection', (socket) => {

	  socket.on('getNotification', (callback) => {

		Notification.
		  find({}).
		  sort('-create_at').
		  limit(30).
		  exec( (err, notification) => {
		  	if (err) return handleError(err)

		  	callback(notification)

		  })

	  })

  })


}