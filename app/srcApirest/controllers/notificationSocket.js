const Notification = require("../models/notification")

const redis = require("redis")

const sub = redis.createClient()

sub.subscribe('notification')

module.exports = (io) => {


  io
  .of('/notification')
  .on('connection', (socket) => {

    socket.on('notification', (callback) => {

      Notification.find({}).sort({'asset.codigo':-1}).exec( (err, doc) => {
        callback(doc)
      })

    })

  })


 
  sub.on('message', (channel, message) => {
    console.log( `POR EL CANAL: ${channel}  Y EL MENSAJE: ${message}`  )
  })



}