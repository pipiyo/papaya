const pool = require('../models/connection')

module.exports = (io) => {

  io
  .of('/listadoVehiculo')
  .on('connection', (socket) => {


  /* Listar Producto */
  socket.on('allVehiculo', (filtro,callback) => {
    let q_vehiculo = ""

    if(filtro.vehiculo){q_vehiculo = ' WHERE PATENTE like "%'+filtro.vehiculo +'%"'}
  
    let query = `select * from vehiculo ${q_vehiculo} limit ${filtro.limit} , ${filtro.limitB} ;`
    let query1 = `select count(*) as total from vehiculo ${q_vehiculo};`
    pool.getConnection( (err, connection) => {
        connection.query(query+query1, (err, rows, fields) => {
            connection.release()
            if (!err){
              callback({vehiculo:rows[0], cuenta:rows[1]})
            }
            else{
              console.log('Error ' + err)
            }
        }) 
    })
  })



})

}