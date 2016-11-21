const redis = require("redis")

const sub = redis.createClient()

sub.subscribe('notification')

module.exports = () => {

 
  sub.on('message', (channel, message) => {
    console.log( `POR EL CANAL: ${channel}  Y EL MENSAJE: ${message}`  )
  })



}